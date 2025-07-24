import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Search, Mic, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainStore = () => {
  const navigate = useNavigate();

  const discountProducts = [
    {
      name: "비비고 김치만두",
      originalPrice: 8500,
      discountPrice: 6200
    },
    {
      name: "서울우유 1L",
      originalPrice: 3800,
      discountPrice: 3100
    },
    {
      name: "다시멸치 300g",
      originalPrice: 9000,
      discountPrice: 8400
    }
  ];

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
      <Tabs className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-app-green-light rounded-none border-b">
          <TabsTrigger value="discounts" className="py-4 text-lg font-medium">
            <Percent className="h-5 w-5 mr-2" />
            할인상품
          </TabsTrigger>
          <TabsTrigger 
            value="cart" 
            className="py-4 text-lg font-medium"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discounts" className="p-4">
          <div className="space-y-3">
            {discountProducts.map((product, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-destructive font-bold text-lg">
                        {product.discountPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-bold">
                      {Math.round((1 - product.discountPrice / product.originalPrice) * 100)}% 할인
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="default" className="p-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainStore;