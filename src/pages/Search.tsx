import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  status?: string; // in_cart 여부 확인용
}

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://offroad.kro.kr/product");
        const data = await response.json();
        setProducts(data);
        setSearchResults(data);
      } catch (error) {
        console.error("전체 상품 불러오기 실패", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(products);
      return;
    }

    try {
      const response = await fetch(
        `https://offroad.kro.kr/product/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("검색 실패", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await fetch(`https://offroad.kro.kr/product/cart/add/${productId}`, {
        method: "POST",
      });

      if (response.ok) {
        const updated = searchResults.map((product) =>
          product._id === productId ? { ...product, status: "in_cart" } : product
        );
        setSearchResults(updated);
        alert("장바구니에 담겼어요!");
      } else {
        const data = await response.json();
        alert(data.message || "장바구니 담기에 실패했습니다.");
      }
    } catch (err) {
      console.error("장바구니 추가 실패", err);
      alert("서버 오류가 발생했어요.");
    }
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    const results = products.filter((product) => product.category === category);
    setSearchResults(results);
  };

  const handleLocationClick = async (productId: string) => {
    try {
      // Step 1: 해당 product의 location 받아오기
      const locRes = await axios.get(`https://offroad.kro.kr/product/location/${productId}`);
      const location = locRes.data.location;
  
      // // Step 2: 해당 location 기준으로 상품들 불러오기
      // const prodRes = await axios.get(`https://offroad.kro.kr/product/location/${location}`);
      // const productsAtLocation = prodRes.data;
  
      // Step 3: MainStore로 이동하면서 state 전달
      navigate("/store", { state: { location } });
    } catch (err) {
      console.error("위치 기반 상품 불러오기 실패", err);
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
          <h1 className="text-lg font-bold">상품 검색</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4">
        {/* Search Input */}
        <Card className="p-4 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="상품명 또는 카테고리를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base py-3"
            />
            <Button onClick={handleSearch} size="lg">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Quick Categories */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">빠른 카테고리 검색</h3>
          <div className="grid grid-cols-2 gap-2">
            {["과일", "야채", "고기/육류", "가공식품", "냉동식품", "조미료/소스", "과자/스낵", "음료"].map(
              (category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="py-3"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              )
            )}
          </div>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              검색 결과 ({searchResults.length}개)
            </h3>
            {searchResults.map((product) => (
              <Card key={product._id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {product.category} ({product.location})
                      </span>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={
                        product.status === "in_cart"
                          ? () => navigate("/store", { state: { openTab: "cart" } })
                          : () => handleAddToCart(product._id)
                      }
                      variant={product.status === "in_cart" ? "secondary" : "default"}
                    >
                      {product.status === "in_cart" ? "장바구니 가기" : "장바구니 담기"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>  handleLocationClick(product._id)}
                    >
                      위치 보기
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Result */}
        {searchQuery && searchResults.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground">
              "{searchQuery}"에 대한 검색 결과가 없습니다
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              다른 키워드로 검색해보세요
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;