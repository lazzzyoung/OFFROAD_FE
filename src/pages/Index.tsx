import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Mic, Search, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cartHeroImage from "@/assets/cart-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">장보러 가는 길</h1>
        <h2 className="text-xl font-medium">OFF ROAD</h2>
      </div>

      {/* Hero Section */}
      <div className="p-6">
        <Card className="p-8 text-center mb-8">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-lg bg-app-green-light flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">스마트한 장보기 시작</h3>
          <p className="text-muted-foreground">
            매장 안내와 AI 도우미로 더 편리한 쇼핑을 경험하세요
          </p>
        </Card>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/store")}
            className="w-full py-6 text-xl font-semibold"
            size="lg"
          >
            <Store className="h-7 w-7 mr-3" />
            입장
          </Button>

          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={() => navigate("/assistant")}
              variant="secondary"
              className="w-full py-5 text-lg font-medium"
              size="lg"
            >
              <Mic className="h-6 w-6 mr-3" />
              마트 도우미
            </Button>

            <Button
              onClick={() => navigate("/cart")}
              variant="secondary" 
              className="w-full py-5 text-lg font-medium"
              size="lg"
            >
              <ShoppingCart className="h-6 w-6 mr-3" />
              장바구니
            </Button>

            <Button
              onClick={() => navigate("/search")}
              variant="secondary"
              className="w-full py-5 text-lg font-medium"
              size="lg"
            >
              <Search className="h-6 w-6 mr-3" />
              상품 검색
            </Button>
          </div>
        </div>

        {/* Footer Info */}
        <Card className="mt-8 p-4 bg-app-green-light">
          <div className="text-center">
            <p className="text-sm font-medium mb-1">QR 코드로 접속하셨나요?</p>
            <p className="text-xs text-muted-foreground">
              카트에 부착된 QR 코드를 통해 언제든지 다시 접속할 수 있습니다
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;