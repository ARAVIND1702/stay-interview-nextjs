"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const questions = [
  "What do you enjoy most about your job?",
  "What motivates you to stay with the company?",
  "What challenges do you face in your role?",
  "Do you feel valued and recognized for your contributions?",
  "How would you rate your work-life balance?",
];

export default function StayInterviewForm() {
  const [ratings, setRatings] = useState(Array(questions.length).fill(0));
  const [comment, setComment] = useState(""); // State for the comment box


  const handleRating = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleSubmit = () => {
    console.log("Submitted Ratings:", ratings);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-orange-500 hover:bg-slate-50 hover:text-gray-900">Stay Interview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <h2 className="text-xl font-bold mb-4 text-center border-b-2 ">Stay Interview Form</h2>
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="p-3 flex items-center justify-between">
              {/* Question Section - 60% width */}
              <div className="w-[60%] flex gap-2">
                <div className="text-base font-semibold">{index + 1}.</div>
                <div className="text-base font-semibold">{question}</div>
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
                    onClick={() => handleRating(index, star)}
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
          Submit
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
