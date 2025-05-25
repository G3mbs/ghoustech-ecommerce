-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    download_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (for guest checkout)
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, expired
    verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    download_token VARCHAR(255) UNIQUE,
    download_count INTEGER DEFAULT 0,
    max_downloads INTEGER DEFAULT 3,
    expires_at TIMESTAMP WITH TIME ZONE,
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OTP verification table
CREATE TABLE otp_verifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(20),
    otp_code VARCHAR(6) NOT NULL,
    purpose VARCHAR(50) NOT NULL, -- email_verification, phone_verification
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download logs table
CREATE TABLE download_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    download_token VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_phone ON orders(customer_phone);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_download_token ON orders(download_token);
CREATE INDEX idx_otp_email ON otp_verifications(email);
CREATE INDEX idx_otp_phone ON otp_verifications(phone);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);

-- Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (is_active = true);

-- Orders policies (customers can only see their own orders)
CREATE POLICY "Customers can view their own orders" ON orders
    FOR SELECT USING (true); -- We'll handle this in the application layer

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, download_url) VALUES
('Premium Design Templates Pack', 'Collection of 50+ professional design templates for social media, presentations, and marketing materials.', 299000, 'Design', '/images/design-templates.jpg', '/downloads/design-templates.zip'),
('Social Media Automation Tool', 'Complete automation tool for managing multiple social media accounts with scheduling and analytics.', 499000, 'Software', '/images/social-automation.jpg', '/downloads/social-automation.zip'),
('E-commerce Starter Kit', 'Ready-to-use e-commerce website template with payment integration and admin dashboard.', 799000, 'Development', '/images/ecommerce-kit.jpg', '/downloads/ecommerce-kit.zip'),
('Digital Marketing Course', 'Comprehensive digital marketing course with 20+ hours of video content and resources.', 399000, 'Education', '/images/marketing-course.jpg', '/downloads/marketing-course.zip'),
('Mobile App UI Kit', 'Modern mobile app UI kit with 100+ screens and components for iOS and Android.', 199000, 'Design', '/images/mobile-ui-kit.jpg', '/downloads/mobile-ui-kit.zip');
