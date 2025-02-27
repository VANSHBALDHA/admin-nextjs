const productsData = [
    {
      productCode: 'P001',
      subSubCategoryName: 'Electronics > Accessories > Headphones',
      productName: 'Wireless Headphones',
      manufactureName: 'AudioTech',
      manufacturePartNumber: 'ATH-1234',
      minimumPurchasedQuantity: 5,
      minimumStockQuantityWarning: 10,
      sellingPrice: 99.99,
      shortDescription: 'High-quality wireless headphones with noise-cancellation.',
      longDescription: 'Experience the best sound quality with AudioTech wireless headphones. Features active noise-cancellation and a long-lasting battery.',
      specifications: 'Bluetooth 5.0, 40mm drivers, 20-hour battery life, noise-cancellation',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      technicalDataSheets: ['datasheet1.pdf', 'datasheet2.pdf'],
      displayQuantity: 20,
      reservedQuantity: 5,
      salesQuantity: 15
    },
    {
      productCode: 'P002',
      subSubCategoryName: 'Home & Kitchen > Appliances > Blenders',
      productName: 'High-Speed Blender',
      manufactureName: 'KitchenPro',
      manufacturePartNumber: 'KP-5678',
      minimumPurchasedQuantity: 3,
      minimumStockQuantityWarning: 5,
      sellingPrice: 79.99,
      shortDescription: 'Versatile high-speed blender for smoothies and more.',
      longDescription: 'Blend your favorite smoothies, soups, and sauces with the KitchenPro high-speed blender. Powerful motor and easy-to-clean design.',
      specifications: '1000W motor, 1.5L jug, multiple speed settings, BPA-free',
      images: ['blender1.jpg', 'blender2.jpg', 'blender3.jpg'],
      technicalDataSheets: ['blender_datasheet1.pdf', 'blender_datasheet2.pdf'],
      displayQuantity: 30,
      reservedQuantity: 8,
      salesQuantity: 22
    },
    {
      productCode: 'P003',
      subSubCategoryName: 'Sports & Outdoors > Equipment > Tents',
      productName: '4-Person Camping Tent',
      manufactureName: 'OutdoorGear',
      manufacturePartNumber: 'OG-2345',
      minimumPurchasedQuantity: 2,
      minimumStockQuantityWarning: 4,
      sellingPrice: 129.99,
      shortDescription: 'Spacious 4-person tent for camping trips.',
      longDescription: 'Enjoy the great outdoors with the OutdoorGear 4-person camping tent. Durable and easy to set up, perfect for family trips.',
      specifications: 'Waterproof, UV protection, 4-person capacity, easy setup',
      images: ['tent1.jpg', 'tent2.jpg', 'tent3.jpg'],
      technicalDataSheets: ['tent_datasheet1.pdf', 'tent_datasheet2.pdf'],
      displayQuantity: 10,
      reservedQuantity: 2,
      salesQuantity: 8
    },
    {
      productCode: 'P004',
      subSubCategoryName: 'Beauty & Health > Skincare > Moisturizers',
      productName: 'Hydrating Face Cream',
      manufactureName: 'SkinEssence',
      manufacturePartNumber: 'SE-9876',
      minimumPurchasedQuantity: 10,
      minimumStockQuantityWarning: 15,
      sellingPrice: 24.99,
      shortDescription: 'Deeply hydrating face cream for all skin types.',
      longDescription: 'Keep your skin moisturized and glowing with SkinEssence hydrating face cream. Suitable for all skin types, non-greasy formula.',
      specifications: '50ml, paraben-free, suitable for all skin types, non-greasy',
      images: ['cream1.jpg', 'cream2.jpg', 'cream3.jpg'],
      technicalDataSheets: ['cream_datasheet1.pdf', 'cream_datasheet2.pdf'],
      displayQuantity: 50,
      reservedQuantity: 10,
      salesQuantity: 40
    },
    {
      productCode: 'P005',
      subSubCategoryName: 'Automotive > Accessories > Car Covers',
      productName: 'All-Weather Car Cover',
      manufactureName: 'AutoShield',
      manufacturePartNumber: 'AS-3456',
      minimumPurchasedQuantity: 1,
      minimumStockQuantityWarning: 3,
      sellingPrice: 59.99,
      shortDescription: 'Durable all-weather car cover for maximum protection.',
      longDescription: 'Protect your car from the elements with AutoShield all-weather car cover. Waterproof and UV-resistant, fits most cars.',
      specifications: 'Waterproof, UV-resistant, fits most cars, easy to install',
      images: ['carcover1.jpg', 'carcover2.jpg', 'carcover3.jpg'],
      technicalDataSheets: ['carcover_datasheet1.pdf', 'carcover_datasheet2.pdf'],
      displayQuantity: 5,
      reservedQuantity: 1,
      salesQuantity: 4
    },
    {
      productCode: 'P006',
      subSubCategoryName: 'Fashion > Footwear > Sneakers',
      productName: 'Running Sneakers',
      manufactureName: 'FitGear',
      manufacturePartNumber: 'FG-4567',
      minimumPurchasedQuantity: 6,
      minimumStockQuantityWarning: 8,
      sellingPrice: 49.99,
      shortDescription: 'Comfortable and stylish running sneakers.',
      longDescription: 'Run in style with FitGear running sneakers. Lightweight, breathable, and comfortable for all-day wear.',
      specifications: 'Lightweight, breathable, cushioned sole, various sizes available',
      images: ['sneakers1.jpg', 'sneakers2.jpg', 'sneakers3.jpg'],
      technicalDataSheets: ['sneakers_datasheet1.pdf', 'sneakers_datasheet2.pdf'],
      displayQuantity: 40,
      reservedQuantity: 10,
      salesQuantity: 30
    },
    {
      productCode: 'P007',
      subSubCategoryName: 'Toys & Games > Educational Toys > STEM Kits',
      productName: 'Robotics STEM Kit',
      manufactureName: 'EduTech',
      manufacturePartNumber: 'ET-7890',
      minimumPurchasedQuantity: 4,
      minimumStockQuantityWarning: 6,
      sellingPrice: 89.99,
      shortDescription: 'Build and program your own robot with this STEM kit.',
      longDescription: 'Learn the basics of robotics and programming with EduTech robotics STEM kit. Perfect for young engineers.',
      specifications: 'Includes all parts, compatible with various programming languages, educational',
      images: ['stemkit1.jpg', 'stemkit2.jpg', 'stemkit3.jpg'],
      technicalDataSheets: ['stemkit_datasheet1.pdf', 'stemkit_datasheet2.pdf'],
      displayQuantity: 20,
      reservedQuantity: 5,
      salesQuantity: 15
    },
    {
      productCode: 'P008',
      subSubCategoryName: 'Tools & Home Improvement > Hand Tools > Screwdrivers',
      productName: 'Precision Screwdriver Set',
      manufactureName: 'ToolMaster',
      manufacturePartNumber: 'TM-0123',
      minimumPurchasedQuantity: 8,
      minimumStockQuantityWarning: 12,
      sellingPrice: 19.99,
      shortDescription: 'High-quality precision screwdriver set.',
      longDescription: 'Handle any small repair job with ToolMaster precision screwdriver set. Includes various sizes for different tasks.',
      specifications: '10-piece set, magnetic tips, ergonomic handle, durable',
      images: ['screwdrivers1.jpg', 'screwdrivers2.jpg', 'screwdrivers3.jpg'],
      technicalDataSheets: ['screwdrivers_datasheet1.pdf', 'screwdrivers_datasheet2.pdf'],
      displayQuantity: 60,
      reservedQuantity: 15,
      salesQuantity: 45
    },
    {
      productCode: 'P009',
      subSubCategoryName: 'Office Supplies > Stationery > Notebooks',
      productName: 'Hardcover Notebook',
      manufactureName: 'WriteWell',
      manufacturePartNumber: 'WW-2345',
      minimumPurchasedQuantity: 20,
      minimumStockQuantityWarning: 30,
      sellingPrice: 12.99,
      shortDescription: 'Durable hardcover notebook for all your writing needs.',
      longDescription: 'Jot down your thoughts and notes in the WriteWell hardcover notebook. Sturdy and stylish design, perfect for everyday use.',
      specifications: '200 pages, A5 size, hardcover, lined pages',
      images: ['notebook1.jpg', 'notebook2.jpg', 'notebook3.jpg'],
      technicalDataSheets: ['notebook_datasheet1.pdf', 'notebook_datasheet2.pdf'],
      displayQuantity: 100,
      reservedQuantity: 25,
      salesQuantity: 75
    },
    {
      productCode: 'P010',
      subSubCategoryName: 'Pet Supplies > Cats > Toys',
      productName: 'Interactive Cat Toy',
      manufactureName: 'PetFun',
      manufacturePartNumber: 'PF-5678',
      minimumPurchasedQuantity: 10,
      minimumStockQuantityWarning: 15,
      sellingPrice: 14.99,
      shortDescription: 'Keep your cat entertained with this interactive toy.',
      longDescription: 'Your cat will love playing with the PetFun interactive cat toy. Engages their natural hunting instincts and keeps them active.',
      specifications: 'Battery-operated, various modes, durable, safe materials',
      images: ['cattoy1.jpg', 'cattoy2.jpg', 'cattoy3.jpg'],
      technicalDataSheets: ['cattoy_datasheet1.pdf', 'cattoy_datasheet2.pdf'],
      displayQuantity: 50,
      reservedQuantity: 10,
      salesQuantity: 40
    }
  ];
  
  export default productsData;
  