import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Search, Mic, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  location: string;
}

interface DiscountItem {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  location: string;
}

const MainStore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "양파", quantity: 1, price: 2000, location: "B구역" },
    { id: "2", name: "당근", quantity: 1, price: 1500, location: "B구역" },
    { id: "3", name: "감자", quantity: 2, price: 3000, location: "B구역" },
    { id: "4", name: "돼지고기", quantity: 1, price: 8000, location: "C구역" },
    { id: "5", name: "카레가루", quantity: 1, price: 2500, location: "G구역" },
    { id: "6", name: "우유", quantity: 1, price: 2800, location: "E구역" },
  ]);

  const discountItems: DiscountItem[] = [
    { id: "1", name: "비비고 김치만두", originalPrice: 8500, discountPrice: 6200, location: "E구역" },
    { id: "2", name: "서울우유 1L", originalPrice: 3800, discountPrice: 3100, location: "E구역" },
    { id: "3", name: "다시멸치 300g", originalPrice: 9000, discountPrice: 8400, location: "G구역" },
  ];

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

      {/* Top Tabs and Content Area */}
      <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-app-green-light rounded-none h-auto">
          <TabsTrigger value="discount" className="py-4 text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            할인상품
          </TabsTrigger>
          <TabsTrigger value="cart" className="py-4 text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discount" className="p-4 mt-0">
          <div className="space-y-3">
            {discountItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {item.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-lg font-bold text-destructive">
                        {item.discountPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-medium">
                      {Math.round(((item.originalPrice - item.discountPrice) / item.originalPrice) * 100)}% 할인
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="p-4 mt-0">
          {cartItems.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-lg text-muted-foreground mb-4">장바구니가 비어있습니다</p>
              <Button onClick={() => navigate("/store")}>
                쇼핑 계속하기
              </Button>
            </Card>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                        <p className="text-sm font-medium">
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-right">
                      <span className="font-semibold text-lg">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-app-green-light">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">총 합계</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  총 {cartItems.length}개 상품
                </div>
                
                <Button className="w-full py-4 text-lg">
                  계산하러 가기
                </Button>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Store Map Section - Only shown when no tab is active */}
        {!activeTab && (
          <div className="p-4">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">매장 안내도</h2>
              
              {/* Placeholder for future SVG map */}
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                <p className="text-muted-foreground">매장 안내도 영역</p>
                <p className="text-sm text-muted-foreground">SVG 파일을 여기에 추가 예정</p>
              </div>
              
              {/* Simplified Store Layout for reference */}
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
          </div>
        )}
      </Tabs>

      {/* Bottom Navigation - Stacked vertically */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground">
        <div className="space-y-0">
          <Button
            onClick={() => navigate("/assistant")}
            variant="ghost"
            className="w-full py-4 text-primary-foreground hover:bg-primary/20 rounded-none h-auto flex items-center justify-center gap-2 border-b border-primary-foreground/20"
          >
            <Mic className="h-5 w-5" />
            <span className="text-sm">마트 도우미에게 도움을 요청하세요</span>
          </Button>
          
          <Button
            onClick={() => navigate("/search")}
            variant="ghost"
            className="w-full py-4 text-primary-foreground hover:bg-primary/20 rounded-none h-auto flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span className="text-sm">상품 검색</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-32"></div>
    </div>
  );
};

export default MainStore;