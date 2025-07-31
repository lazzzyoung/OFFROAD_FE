import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Search, Mic, Minus, Plus, Trash2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'; 
import MapSvg from '/src/assets/map.svg?react';
import axios from "axios";

// ================== 타입 정의 ==================
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

// ================== 컴포넌트 ==================
const MainStore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const locationHook = useLocation();
  const locationState = locationHook.state as { location?: string };

  // 서버에서 받은 실시간 위치
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // UWB 좌표계 → SVG 비율 변환 (실제 환경에 맞게 조정 필요)
  const svgWidth = 4033;
  const svgHeight = 3328;
  const uwbWidth = 2.5;   // UWB 좌표계 X축 최대 범위 (단위: m)
  const uwbHeight = 2.5;  // Y축 범위 (앵커 배치에 맞게 설정)

  const toSvgCoords = (x: number, y: number) => {
    return {
      left: `${(x / uwbWidth) * 100}%`,
      top: `${(y / uwbHeight) * 100}%`,
    };
  };

  // ================== API 요청 ==================
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://offroad.kro.kr/product/cart");
      const data = response.data.map((item: any) => ({
        id: item._id,
        name: item.name,
        quantity: 1,
        price: item.price,
        location: item.location,
      }));
      setCartItems(data);
    } catch (err) {
      console.error("장바구니 항목 불러오기 실패:", err);
    }
  };

  // 위치 fetch 주기적으로 실행
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("https://offroad.kro.kr/position");
        setPosition(res.data); // { x, y }
      } catch (err) {
        console.error("실시간 위치 가져오기 실패:", err);
      }
    }, 1000); // 1초마다 요청
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "cart") {
      fetchCartItems();
    }
  };

  // ================== 장바구니 로직 ==================
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ================== 할인상품 더미 ==================
  const discountItems: DiscountItem[] = [
    { id: "1", name: "비비고 김치만두", originalPrice: 8500, discountPrice: 6200, location: "E구역" },
    { id: "2", name: "서울우유 1L", originalPrice: 3800, discountPrice: 3100, location: "E구역" },
    { id: "3", name: "다시멸치 300g", originalPrice: 9000, discountPrice: 8400, location: "G구역" },
  ];

  // ================== UI ==================
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
          <h1 className="text-lg font-bold flex-1 text-center">장보러 가는 길, OFF ROAD</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(undefined)}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs className="w-full" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 bg-app-green-light rounded-none h-auto">
          <TabsTrigger value="discount">% 할인상품</TabsTrigger>
          <TabsTrigger value="cart">
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </TabsTrigger>
        </TabsList>

        {/* 할인상품 */}
        {activeTab === "discount" && (
          <TabsContent value="discount" className="p-4 mt-0">
            <div className="space-y-3">
              {discountItems.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="line-through">{item.originalPrice.toLocaleString()}원</span>
                        <span className="text-lg font-bold text-destructive">
                          {item.discountPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                    <div className="bg-destructive text-white px-2 py-1 rounded text-sm font-medium">
                      {Math.round(((item.originalPrice - item.discountPrice) / item.originalPrice) * 100)}% 할인
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* 장바구니 */}
        {activeTab === "cart" && (
          <TabsContent value="cart" className="p-4 mt-0">
            {cartItems.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-lg text-muted-foreground mb-4">장바구니가 비어있습니다</p>
                <Button onClick={() => navigate("/store")}>쇼핑 계속하기</Button>
              </Card>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cartItems.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm">{item.location}</p>
                          <p>{item.price.toLocaleString()}원</p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                          <span>{item.quantity}</span>
                          <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                          <Button onClick={() => removeItem(item.id)}>삭제</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="p-4 bg-app-green-light">
                  <div className="flex justify-between">
                    <span>총 합계</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                </Card>
              </>
            )}
          </TabsContent>
        )}

        {/* 매장 안내도 */}
        {!activeTab && (
          <div className="p-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-center mb-4">매장 안내도</h2>
              <div className="relative w-full">
                <MapSvg className="w-full h-auto" />
                {position && (
                  <div
                    className="absolute w-4 h-4 bg-red-500 rounded-full"
                    style={{
                      ...toSvgCoords(position.x, position.y),
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>
            </Card>
          </div>
        )}
      </Tabs>

      {/* 하단 버튼 */}
      <div className="fixed bottom-4 left-4 right-4 flex flex-col gap-2">
        <Button onClick={() => navigate("/search")}>
          <Search className="mr-2" /> 상품 검색
        </Button>
        <Button onClick={() => navigate("/assistant")}>
          <Mic className="mr-2" /> 마트 도우미에게 도움 요청
        </Button>
      </div>
    </div>
  );
};

export default MainStore;