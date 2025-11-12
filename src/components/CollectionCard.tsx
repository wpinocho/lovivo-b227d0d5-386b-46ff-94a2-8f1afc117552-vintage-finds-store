<document path="src/components/CollectionCard.tsx">
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden cursor-pointer">
      <CardContent className="p-0" onClick={() => onViewProducts(collection.id)}>
        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          
          {/* Featured Badge */}
          {collection.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-secondary text-secondary-foreground shadow-md">
                Featured
              </Badge>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 bg-card">
          <h3 className="font-bold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {collection.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}</document>
