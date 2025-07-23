import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  location: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "양파", quantity: 1, price: 2000, location: "B구역" },
    { id: "2", name: "당근", quantity: 1, price: 1500, location: "B구역" },
    { id: "3", name: "감자", quantity: 2, price: 3000, location: "B구역" },
    { id: "4", name: "돼지고기", quantity: 1, price: 8000, location: "C구역" },
    { id: "5", name: "카레가루", quantity: 1, price: 2500, location: "G구역" },
    { id: "6", name: "우유", quantity: 1, price: 2800, location: "E구역" },
  ]);

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
            onClick={() => navigate("/store")}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">장바구니</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4">
        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">장바구니가 비어있습니다</p>
            <Button onClick={() => navigate("/store")}>
              쇼핑 계속하기
            </Button>
          </Card>
        ) : (
          <>
            {/* Cart Items */}
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
                      {/* Quantity Controls */}
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
                      
                      {/* Remove Button */}
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

            {/* Total */}
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
              
              <div className="space-y-2">
                <Button className="w-full py-4 text-lg">
                  계산하러 가기
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-3"
                  onClick={() => navigate("/store")}
                >
                  쇼핑 계속하기
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;