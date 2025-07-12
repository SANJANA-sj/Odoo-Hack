import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  pointsValue: number;
  status: 'available' | 'pending' | 'swapped';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

interface ItemContextType {
  items: ClothingItem[];
  addItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => ClothingItem | undefined;
  getUserItems: (userId: string) => ClothingItem[];
  getPendingItems: () => ClothingItem[];
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in spring and fall.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', 'casual'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    pointsValue: 25,
    status: 'available',
    approvalStatus: 'approved',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful flowing dress with floral print. Perfect for summer occasions.',
    category: 'Dresses',
    type: 'Dress',
    size: 'S',
    condition: 'Good',
    tags: ['floral', 'summer', 'casual'],
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '3',
    uploaderName: 'Emily Chen',
    pointsValue: 20,
    status: 'available',
    approvalStatus: 'approved',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Designer Wool Coat',
    description: 'Luxurious wool coat from a premium brand. Excellent for winter weather.',
    category: 'Outerwear',
    type: 'Coat',
    size: 'L',
    condition: 'Like New',
    tags: ['designer', 'wool', 'winter'],
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '4',
    uploaderName: 'Michael Brown',
    pointsValue: 40,
    status: 'available',
    approvalStatus: 'approved',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'Casual Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in navy blue. Great for everyday wear.',
    category: 'Tops',
    type: 'T-Shirt',
    size: 'M',
    condition: 'Good',
    tags: ['cotton', 'casual', 'basic'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    pointsValue: 10,
    status: 'available',
    approvalStatus: 'pending',
    createdAt: new Date('2024-02-01')
  }
];

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ClothingItem[]>(mockItems);

  const addItem = (itemData: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    const newItem: ClothingItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ClothingItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  const getUserItems = (userId: string) => {
    return items.filter(item => item.uploaderId === userId);
  };

  const getPendingItems = () => {
    return items.filter(item => item.approvalStatus === 'pending');
  };

  return (
    <ItemContext.Provider value={{
      items,
      addItem,
      updateItem,
      deleteItem,
      getItemById,
      getUserItems,
      getPendingItems
    }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}