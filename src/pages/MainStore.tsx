import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Search, Mic, Minus, Plus, Trash2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'; 
import MapSvg from '/src/assets/map.svg?react';
import MapMarker from "@/components/ui/MapMarker";

import axios from "axios";


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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [products, setProducts] = useState<CartItem[]>([]);

  const locationHook = useLocation();
  const locationState = locationHook.state as {location?: string;};

  const [location, setLocation] = useState(locationState?.location || "");
  
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
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "cart") {
      fetchCartItems();
    }
  };

  useEffect(() => {
    if (!location) {
      // fallback 처리: 전체 상품 다시 불러오거나 에러 메시지
    }
  }, []);
  

    // ✅ 장바구니에 상품 추가
    const addToCart = (product: any) => {
      setCartItems(prev => {
        const exists = prev.find(item => item.id === product._id);
        if (exists) {
          return prev.map(item =>
            item.id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prev,
            {
              id: product._id,
              name: product.name,
              quantity: 1,
              price: product.price,
              location: product.location,
            },
          ];
        }
      });
    };
  

  
  
  
  // const [cartItems, setCartItems] = useState<CartItem[]>([
  //   { id: "1", name: "양파", quantity: 1, price: 2000, location: "B구역" },
  //   { id: "2", name: "당근", quantity: 1, price: 1500, location: "B구역" },
  //   { id: "3", name: "감자", quantity: 2, price: 3000, location: "B구역" },
  //   { id: "4", name: "돼지고기", quantity: 1, price: 8000, location: "C구역" },
  //   { id: "5", name: "카레가루", quantity: 1, price: 2500, location: "G구역" },
  //   { id: "6", name: "우유", quantity: 1, price: 2800, location: "E구역" },
  // ]);

  const discountItems: DiscountItem[] = [
    { id: "1", name: "비비고 김치만두", originalPrice: 8500, discountPrice: 6200, location: "E구역" },
    { id: "2", name: "서울우유 1L", originalPrice: 3800, discountPrice: 3100, location: "E구역" },
    { id: "3", name: "다시멸치 300g", originalPrice: 9000, discountPrice: 8400, location: "G구역" },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          {/* Left: Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {/* Center: Title */}
          <h1 className="text-lg font-bold flex-1 text-center">장보러 가는 길, OFF ROAD</h1>
          {/* Right: Home Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(undefined)} // 이 부분은 그대로 둡니다.
            className="text-primary-foreground hover:bg-primary/20"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Top Tabs and Content Area */}
      <Tabs className="w-full" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 bg-app-green-light rounded-none h-auto">
          <TabsTrigger value="discount" className="py-4 text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            % 할인상품
          </TabsTrigger>
          <TabsTrigger value="cart" className="py-4 text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </TabsTrigger>
        </TabsList>

        {/* --- 이 부분이 수정됩니다 --- */}
        {activeTab === "discount" && ( // activeTab이 "discount"일 때만 렌더링
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
        )}
        
        {activeTab === "cart" && ( // activeTab이 "cart"일 때만 렌더링
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
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={async () => {
                    try {
                      await axios.post("https://offroad.kro.kr/product/cart/clear");
                      setCartItems([]); // 프론트에서도 장바구니 비움
                    } catch (err) {
                      console.error("장바구니 초기화 실패", err);
                    }
                  }}
                >
                  장바구니 비우기
                </Button>
                  
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
        )}

        {/* Store Map Section - Only shown when no tab is active */}
        {!activeTab && (
          <div className="p-4">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">매장 안내도</h2>
              
              {/* Placeholder for future SVG map */}
              
              <div className="relative w-full">
                <MapSvg className="w-full h-auto" />
                {/* 마커 예시 */}
                {/* 아래 location에 측정 값 입력해주면 될듯 */}
                <MapMarker location="B2" />
                <MapMarker location={location} />
                {/* IN (입구 기준점) : { top: "12%", left: "37.3%" } */}
                
              </div>
                
              
            </Card>
          </div>
        )}
      </Tabs>

      <Button
              onClick={() => navigate("/search")}
              variant="secondary"
              className="w-full py-5 text-lg font-medium"
              size="lg"
            >
              <Search className="h-6 w-6 mr-3" />
              상품 검색
            </Button>
      

      <div className="fixed bottom-4 left-4 right-4">
          <Button 
            className="w-full py-4 text-lg shadow-lg"
            onClick={() => navigate("/assistant")}
          >
            <Mic className="h-6 w-6 mr-2" />
            마트 도우미에게 도움을 요청해보세요
          </Button>
      </div>

      {/* <div className="fixed bottom-12left-4 right-4">
          <Button 
            className="w-full py-4 text-lg shadow-lg"
            onClick={() => navigate("/search")}
          >
            <Search className="h-0 w-5" />
            상품 검색
          </Button>
      </div> */}
      

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-32"></div>
    </div>
  );
};

export default MainStore;