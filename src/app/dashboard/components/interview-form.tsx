"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { db, doc, addDoc } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

interface QuestionItem {
  question_id: number;
  question: string;
}

interface StayInterviewFormProps {
  employeeId: string;
  employeeName: string;
}

export default function StayInterviewForm({employeeId, employeeName} : StayInterviewFormProps) {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [ratings, setRatings] = useState(Array(questions.length).fill(0));
  const [comment, setComment] = useState(""); // State for the comment box
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(open){
      fetchQuestionList();
    }
  }, [open, employeeId]);


  const fetchQuestionList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Questions"));
      let fetchedData: QuestionItem[] = querySnapshot.docs.map((doc) => ({
        question_id: doc.data().question_id,
        question: doc.data().question
      })) as QuestionItem[];

      //sort the data list from firebase DB
      fetchedData = fetchedData.sort((a, b) => a.question_id - b.question_id);
      setQuestions(fetchedData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRating = (index: number, questionId: number, rating: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "employeeFeedback"), {
        employee: employeeId,
        feedback: responses,
        comment: comment,
        timestamp: new Date().toISOString(),
      });
      alert("Added feedback successfully.");
    } catch (error) {
      alert("Failed to submit feedback.");
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-brandOrange hover:bg-gray-950 " >Stay Interview</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{employeeName}&apos;s Stay Interview Form</DialogTitle>
        </DialogHeader>
        {/* <h2 className="text-xl font-bold mb-4 text-center border-b-2 ">Stay Interview Form</h2> */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="p-3 flex items-center justify-between">
              {/* Question Section - 60% width */}
              <div className="w-[60%] flex gap-2">
                <div className="text-base font-semibold">{index + 1}.</div>
                <div className="text-base font-semibold">{question.question}</div>
              </div>
              
              {/* Stars Section - 40% width */}
              <div className="w-[40%] flex justify-end gap-1">
              
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      ratings[index] >= star ? "fill-orange-500 text-orange-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRating(index, question.question_id, star)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
         {/* Comment Box */}
         <div>
            <label htmlFor="comment" className="text-base font-semibold block mb-1">
              Additional Comments
            </label>
            <Textarea
              id="comment"
              placeholder="Write your feedback here..."
              className="w-full border-slate-300 rounded-md p-2 h-10004"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-4">
        <Button className="w-20 py-6 bg-orange-500" onClick={handleSubmit}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
