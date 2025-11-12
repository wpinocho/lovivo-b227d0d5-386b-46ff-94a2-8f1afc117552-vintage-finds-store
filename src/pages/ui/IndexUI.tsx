<document path="src/pages/ui/IndexUI.tsx">
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Recycle, ShieldCheck, Heart } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Vintage recommerce fashion store homepage
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const brands = ['Levi\'s', 'Nike', 'Adidas', 'Carhartt', 'Tommy Hilfiger', 'Vintage'];
  const conditions = ['Excellent Condition', 'Good Condition', 'Fair Condition'];

  // Filter products by brand and condition
  const displayProducts = filteredProducts.filter(product => {
    const brandMatch = !selectedBrand || product.tags?.includes(selectedBrand);
    const conditionMatch = !selectedCondition || product.tags?.includes(selectedCondition);
    return brandMatch && conditionMatch;
  });

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
  };

  const handleConditionClick = (condition: string) => {
    setSelectedCondition(selectedCondition === condition ? null : condition);
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-secondary text-secondary-foreground mb-6 text-sm font-semibold px-4 py-2">
              <Recycle className="h-4 w-4 mr-2" />
              Sustainable Fashion Marketplace
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Buy & Sell
              <span className="block text-secondary mt-2">Vintage Treasures</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover unique pre-loved fashion pieces with authentic character. 
              Every item has a story, every purchase makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-semibold"
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore Finds
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg backdrop-blur-sm"
              >
                How It Works
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">Authenticated</p>
              </div>
              <div className="text-center">
                <Recycle className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">Sustainable</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm font-medium">Curated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Condition Filters */}
      <section className="bg-muted/30 py-8 border-b sticky top-0 z-30 backdrop-blur-sm bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Filter by Brand</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <Button
                    key={brand}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBrandClick(brand)}
                    className={selectedBrand === brand ? "bg-primary" : ""}
                  >
                    {brand}
                  </Button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Filter by Condition</h3>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <Button
                    key={condition}
                    variant={selectedCondition === condition ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleConditionClick(condition)}
                    className={selectedCondition === condition ? "bg-primary" : ""}
                  >
                    {condition}
                  </Button>
                ))}
              </div>
            </div>

            {(selectedBrand || selectedCondition) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedCondition(null);
                }}
                className="text-muted-foreground"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked selections of vintage pieces organized by era, style, and brand
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                  : 'Latest Arrivals'
                }
              </h2>
              <p className="text-muted-foreground mt-2">
                {displayProducts.length} unique piece{displayProducts.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                See All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Care Guide Section */}
      <section className="py-16 bg-gradient-to-br from-secondary/20 via-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vintage Care Guide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keep your pre-loved pieces looking their best for years to come
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Washing Tips</h3>
              <p className="text-muted-foreground">
                Always check fabric labels. Hand wash delicate vintage items in cold water with mild detergent. Turn inside out to preserve prints.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Storage</h3>
              <p className="text-muted-foreground">
                Store in a cool, dry place away from direct sunlight. Use padded hangers for delicate items and fold heavier pieces to maintain shape.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
              <p className="text-muted-foreground">
                Air out regularly to prevent odors. Repair small issues promptly. Consider professional cleaning for valuable pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};</document>
