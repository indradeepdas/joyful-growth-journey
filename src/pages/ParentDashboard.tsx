import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

interface ChildData {
  id: string;
  name: string;
  age: number;
  // Add other child properties as needed
  [key: string]: any;
}

function ParentDashboard() {
  const { currentUser } = useContext(AuthContext);
  const [children, setChildren] = useState<ChildData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!currentUser) return;
      
      try {
        const childrenQuery = query(
          collection(db, 'children'),
          where('parentId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(childrenQuery);
        const childrenData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ChildData[];
        
        setChildren(childrenData);
      } catch (err) {
        console.error("Error fetching children:", err);
        setError("Failed to load children data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchChildren();
  }, [currentUser]);

  if (loading) return <div>Loading your dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // Keep the rest of your ParentDashboard component UI code...
  return (
    <div>
      <h1>Parent Dashboard</h1>
      <h2>Your Children</h2>
      {children.length === 0 ? (
        <p>No children found. Please add a child to get started.</p>
      ) : (
        <ul>
          {children.map(child => (
            <li key={child.id}>
              {child.name} - {child.age} years old
              {/* Display other child information */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ParentDashboard;
