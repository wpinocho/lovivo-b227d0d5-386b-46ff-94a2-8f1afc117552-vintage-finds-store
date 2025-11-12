<document path="src/templates/EcommerceTemplate.tsx">
import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Recycle } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Vintage recommerce store template
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-background border-b border-border ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Vintage Finds</h1>
                <p className="text-xs text-muted-foreground">Sustainable Fashion</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Shop
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Stories
              </Link>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Sell
              </a>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="outline"
                size="icon"
                onClick={openCart}
                className="relative border-primary/20 hover:bg-primary/10"
                aria-label="View cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold">Vintage Finds</h3>
                <p className="text-xs text-background/70">Sustainable Fashion</p>
              </div>
            </div>
            <p className="text-background/80 mb-4">
              Your destination for authenticated vintage fashion. Every piece tells a story, every purchase helps the planet.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Shop</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                New Arrivals
              </Link>
              <Link 
                to="/" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Collections
              </Link>
              <a 
                href="#" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Brands
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Support</h3>
            <div className="space-y-2">
              <Link 
                to="/blog" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Care Guide
              </Link>
              <a 
                href="#" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                How to Sell
              </a>
              <a 
                href="#" 
                className="block text-background/70 hover:text-background transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-background/70">
          <p>&copy; 2024 Vintage Finds. Sustainable fashion for a better tomorrow.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}</document>
