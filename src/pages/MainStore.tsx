import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Search, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainStore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">장보러 가는 길, OFF ROAD</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Tab Menu */}
      <div className="bg-app-green-light border-b">
        <div className="flex">
          <Button 
            variant="ghost" 
            className="flex-1 py-4 text-lg font-medium bg-primary text-primary-foreground"
          >
            할인상품
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 py-4 text-lg font-medium hover:bg-app-green-light"
          >
            상품리스트
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 py-4 text-lg font-medium hover:bg-app-green-light"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </Button>
        </div>
      </div>

      {/* Store Map */}
      <div className="p-4">
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">매장 안내도</h2>
          
          {/* Simplified Store Layout */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">과일</div>
              <div className="text-xs text-muted-foreground">A구역</div>
            </Card>
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">채소</div>
              <div className="text-xs text-muted-foreground">B구역</div>
            </Card>
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">정육</div>
              <div className="text-xs text-muted-foreground">C구역</div>
            </Card>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">수산</div>
              <div className="text-xs text-muted-foreground">D구역</div>
            </Card>
            <Card className="p-4 bg-secondary text-center">
              <div className="text-sm font-medium">계산대</div>
              <div className="text-xs text-muted-foreground">중앙</div>
            </Card>
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">냉장</div>
              <div className="text-xs text-muted-foreground">E구역</div>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">생활용품</div>
              <div className="text-xs text-muted-foreground">F구역</div>
            </Card>
            <Card className="p-4 bg-app-green-light text-center">
              <div className="text-sm font-medium">가공식품</div>
              <div className="text-xs text-muted-foreground">G구역</div>
            </Card>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/search")}
            className="w-full py-6 text-lg font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          >
            <Search className="h-6 w-6 mr-3" />
            상품 검색
          </Button>
          
          <Button
            onClick={() => navigate("/assistant")}
            className="w-full py-6 text-lg font-medium"
          >
            <Mic className="h-6 w-6 mr-3" />
            마트 도우미에게 도움을 요청하세요
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainStore;