import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Assistant = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const sampleIngredients = [
    "양파 1개",
    "당근 1개", 
    "감자 2개",
    "돼지고기 200g",
    "카레가루 1팩",
    "우유 200ml"
  ];

  const sampleQuestions = [
    "김치찌개 레시피 알려줘",
    "파스타 재료 뭐뭐 있어?",
    "간단한 아침 메뉴 추천해줘",
    "다이어트 식단 도와줘"
  ];

  const handleSubmit = () => {
    if (question.trim()) {
      setShowResponse(true);
    }
  };

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(checkedItems.filter(i => i !== item));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/store")}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">마트 도우미</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Question Input */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">무엇을 도와드릴까요?</h2>
          <div className="flex gap-2">
            <Input
              placeholder="예: 김치찌개 레시피 알려줘"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 text-base py-3"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button onClick={handleSubmit} size="lg">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-3 py-3"
            onClick={() => setShowResponse(true)}
          >
            <Mic className="h-5 w-5 mr-2" />
            음성으로 질문하기
          </Button>
        </Card>

        {/* Sample Questions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">이런 것들을 물어보세요</h3>
          <div className="grid grid-cols-1 gap-2">
            {sampleQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left py-3 h-auto"
                onClick={() => {
                  setQuestion(q);
                  setShowResponse(true);
                }}
              >
                {q}
              </Button>
            ))}
          </div>
        </Card>

        {/* Response */}
        {showResponse && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">카레 만들기 재료</h3>
            <p className="text-sm text-muted-foreground mb-4">
              필요한 재료들을 체크해보세요. 장바구니에 담을 수 있어요!
            </p>
            
            <div className="space-y-3">
              {sampleIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    checked={checkedItems.includes(ingredient)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(ingredient, checked as boolean)
                    }
                  />
                  <label className="text-base">{ingredient}</label>
                </div>
              ))}
            </div>

            <Button 
              className="w-full mt-4 py-3"
              onClick={() => navigate("/cart")}
              disabled={checkedItems.length === 0}
            >
              선택한 재료 장바구니에 담기 ({checkedItems.length}개)
            </Button>
          </Card>
        )}

        {/* Bottom Help Button */}
        <div className="fixed bottom-4 left-4 right-4">
          <Button 
            className="w-full py-4 text-lg shadow-lg"
            onClick={() => setShowResponse(false)}
          >
            <Mic className="h-6 w-6 mr-2" />
            AI 어시스턴트에게 도움을 요청하세요
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;