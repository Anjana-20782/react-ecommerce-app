import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { AiOutlineShopping, AiOutlineTruck, AiOutlineShield, AiOutlineReload, AiOutlineRight, AiOutlineStar } from "react-icons/ai";

export default function Home() {
  console.log("rendering");
  
  const { products } = useContext(ProductContext);

  // Get featured products (first 8)
  const featuredProducts = products?.slice(0, 8) || [];

  // Categories for display
  const categories = [
    { name: "Electronics", icon: "📱", count: "120+ Products", color: "#ff6b6b" },
    { name: "Fashion", icon: "👕", count: "200+ Products", color: "#4ecdc4" },
    { name: "Home & Garden", icon: "🏠", count: "80+ Products", color: "#45b7d1" },
    { name: "Sports", icon: "⚽", count: "90+ Products", color: "#f9ca24" },
    { name: "Books", icon: "📚", count: "150+ Products", color: "#a55eea" },
    { name: "Beauty", icon: "💄", count: "100+ Products", color: "#fd79a8" }
  ];

  // Featured deals
  const deals = [
    { title: "50% OFF", subtitle: "On Electronics", image: "🔌", bgColor: "linear-gradient(135deg, #ff6b6b, #ee5a24)" },
    { title: "Buy 1 Get 1", subtitle: "Fashion Items", image: "👗", bgColor: "linear-gradient(135deg, #4ecdc4, #44a08d)" },
    { title: "Free Shipping", subtitle: "Above ₹999", image: "🚚", bgColor: "linear-gradient(135deg, #45b7d1, #3282b8)" },
    { title: "30% OFF", subtitle: "Home Decor", image: "🛋️", bgColor: "linear-gradient(135deg, #f9ca24, #f0932b)" }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            margin: '0 0 1rem 0',
            background: 'linear-gradient(45deg, #ffffff, #e8f4fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2'
          }}>
            Welcome to FlipStore
          </h1>
          <p style={{
            fontSize: '1.3rem',
            margin: '0 0 2rem 0',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            Discover amazing products at unbeatable prices. Quality guaranteed with fast, reliable delivery.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/products" style={{
              background: 'linear-gradient(135deg, #ff9f43 0%, #ff8c42 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(255, 159, 67, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 159, 67, 0.4)';
            }}>
              <AiOutlineShopping size={20} />
              Shop Now
            </Link>

            <button style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}>
              Explore Deals
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '3rem 2rem',
        background: 'white',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 3,
        borderRadius: '20px 20px 0 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff9f43, #ff8c42)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <AiOutlineTruck size={24} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.25rem 0'
              }}>
                Free Shipping
              </h3>
              <p style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                Free delivery on orders above ₹999
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <AiOutlineShield size={24} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.25rem 0'
              }}>
                Secure Payment
              </h3>
              <p style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                100% secure payment methods
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #a55eea, #8854d0)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <AiOutlineReload size={24} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.25rem 0'
              }}>
                Easy Returns
              </h3>
              <p style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                30-day return policy
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fd79a8, #e84393)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎧</span>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '0 0 0.25rem 0'
              }}>
                24/7 Support
              </h3>
              <p style={{
                color: '#6c757d',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                Round-the-clock customer care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        padding: '3rem 2rem',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: '0 0 0.5rem 0'
            }}>
              Shop by Category
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: '1.1rem',
              margin: '0'
            }}>
              Explore our wide range of product categories
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e9ecef'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = category.color;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  e.target.style.borderColor = '#e9ecef';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  opacity: '0.8'
                }}>
                  {category.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '0.9rem',
                    margin: '0'
                  }}>
                    {category.count}
                  </p>
                </div>
                <AiOutlineRight size={20} style={{ color: '#1e3c72', marginLeft: 'auto' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section style={{
        padding: '3rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: '0 0 0.5rem 0'
            }}>
              🔥 Hot Deals
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: '1.1rem',
              margin: '0'
            }}>
              Limited time offers you can't miss
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {deals.map((deal, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${deal.bgColor.split(',')[0]}, ${deal.bgColor.split(',')[1]})`,
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  opacity: '0.9'
                }}>
                  {deal.image}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0'
                }}>
                  {deal.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  margin: '0',
                  opacity: '0.9'
                }}>
                  {deal.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{
        padding: '3rem 2rem',
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1a1a1a',
                margin: '0 0 0.5rem 0'
              }}>
                Featured Products
              </h2>
              <p style={{
                color: '#6c757d',
                fontSize: '1.1rem',
                margin: '0'
              }}>
                Handpicked products just for you
              </p>
            </div>
            <Link
              to="/products"
              style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(30, 60, 114, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View All Products
              <AiOutlineRight size={16} />
            </Link>
          </div>

      <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
        ))}
      </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 1rem 0'
          }}>
            Stay Updated
          </h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: '0.9',
            margin: '0 0 2rem 0'
          }}>
            Subscribe to our newsletter for the latest deals and product updates
          </p>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            maxWidth: '400px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #ff9f43 0%, #ff8c42 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 159, 67, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
