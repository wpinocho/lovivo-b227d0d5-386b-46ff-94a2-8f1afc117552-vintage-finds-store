<document path="src/components/ui/ProductCardUI.tsx">
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Vintage secondhand fashion product card with condition badges
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => {
        // Extract condition from tags
        const conditionTag = logic.product.tags?.find(tag => 
          tag.includes('Condition')
        );
        
        // Extract brand from tags (first non-condition tag)
        const brandTag = logic.product.tags?.find(tag => 
          !tag.includes('Condition') && ['Levi\'s', 'Nike', 'Adidas', 'Carhartt', 'Tommy Hilfiger', 'Vintage'].includes(tag)
        );

        return (
          <Card className="group hover:shadow-lg transition-all duration-300 border-border overflow-hidden">
            <CardContent className="p-0">
              <Link to={`/products/${logic.product.slug}`} className="block">
                <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
                  {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                    <img
                      src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                      alt={logic.product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {logic.discountPercentage && (
                      <Badge className="bg-destructive text-destructive-foreground shadow-md">
                        -{logic.discountPercentage}% OFF
                      </Badge>
                    )}
                    {logic.product.featured && (
                      <Badge className="bg-secondary text-secondary-foreground shadow-md">
                        Featured
                      </Badge>
                    )}
                    {!logic.inStock && (
                      <Badge className="bg-muted text-muted-foreground shadow-md">
                        Sold Out
                      </Badge>
                    )}
                  </div>

                  {/* Condition Badge */}
                  {conditionTag && (
                    <div className="absolute bottom-3 right-3">
                      <Badge 
                        variant="outline" 
                        className="bg-background/90 backdrop-blur-sm border-primary/50 text-foreground"
                      >
                        {conditionTag}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Brand */}
                  {brandTag && (
                    <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">
                      {brandTag}
                    </p>
                  )}

                  <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {logic.product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-foreground">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                    {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {logic.formatMoney(logic.currentCompareAt)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Variants */}
              {logic.hasVariants && logic.options && (
                <div className="px-4 pb-3 space-y-2 border-t border-border pt-3">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-muted-foreground mb-1">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-6 w-6 rounded-full border-2 transition-all ${
                                  isSelected ? 'border-primary scale-110' : 'border-border'
                                }`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border rounded px-2 py-1 text-xs font-medium transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary text-primary-foreground' 
                                  : 'border-border bg-background text-foreground hover:border-primary'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="px-4 pb-4">
                <Button
                  variant={logic.inStock ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="w-full"
                >
                  {logic.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      }}
    </HeadlessProductCard>
  )
}</document>
