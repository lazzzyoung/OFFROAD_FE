import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search as SearchIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  location: string;
  section: string;
  price: number;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const allProducts: Product[] = [
    { id: "1", name: "사과", location: "A1", section: "과일", price: 3000 },
    { id: "2", name: "바나나", location: "A2", section: "과일", price: 2500 },
    { id: "3", name: "양파", location: "B1", section: "채소", price: 2000 },
    { id: "4", name: "당근", location: "B2", section: "채소", price: 1500 },
    { id: "5", name: "감자", location: "B3", section: "채소", price: 3000 },
    { id: "6", name: "돼지고기", location: "C1", section: "정육", price: 8000 },
    { id: "7", name: "소고기", location: "C2", section: "정육", price: 15000 },
    { id: "8", name: "고등어", location: "D1", section: "수산", price: 5000 },
    { id: "9", name: "우유", location: "E1", section: "냉장", price: 2800 },
    { id: "10", name: "요거트", location: "E2", section: "냉장", price: 1200 },
    { id: "11", name: "세제", location: "F1", section: "생활용품", price: 4500 },
    { id: "12", name: "카레가루", location: "G1", section: "가공식품", price: 2500 },
    { id: "13", name: "라면", location: "G2", section: "가공식품", price: 800 },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.section.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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
            {["과일", "채소", "정육", "수산", "냉장", "생활용품", "가공식품"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="py-3"
                onClick={() => {
                  setSearchQuery(category);
                  const results = allProducts.filter(product => 
                    product.section === category
                  );
                  setSearchResults(results);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">검색 결과 ({searchResults.length}개)</h3>
            {searchResults.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {product.section} ({product.location})
                      </span>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="whitespace-nowrap">
                      장바구니 담기
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/store")}
                    >
                      위치 보기
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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