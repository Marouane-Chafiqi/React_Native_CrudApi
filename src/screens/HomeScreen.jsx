import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import apiClient from '../api/client';
import ProductItem from '../components/ProductItem';
import ProductForm from '../components/ProductForm';

// Transforme une erreur Axios en message lisible
const getErrorMessage = (error) => {
  if (error.response) {
    return `Erreur serveur : ${error.response.status}`;
  }
  if (error.request) {
    return 'Erreur réseau : vérifiez votre connexion Internet.';
  }
  return 'Une erreur inattendue est survenue.';
};

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // READ
  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await apiClient.get('/products');
      setProducts(response.data.slice(0, 10));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchProducts();
      setLoading(false);
    };
    load();
  }, []);

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  // CREATE + UPDATE
  const handleFormSubmit = async (data) => {
    setSaving(true);
    try {
      if (selectedProduct) {
        const res = await apiClient.put(`/products/${selectedProduct.id}`, data);
        setProducts(products.map((p) => (p.id === selectedProduct.id ? res.data : p)));
        setSelectedProduct(null);
      } else {
        const res = await apiClient.post('/products', {
          ...data,
          description: 'Description par défaut',
          categoryId: 1,
          images: ['https://placehold.co/600x400'],
        });
        setProducts([res.data, ...products]);
      }
    } catch (err) {
      Alert.alert('Erreur', getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDeleteProduct = (id) => {
    Alert.alert('Confirmation', 'Voulez-vous vraiment supprimer ce produit ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await apiClient.delete(`/products/${id}`);
            setProducts((current) => current.filter((p) => p.id !== id));
            if (selectedProduct && selectedProduct.id === id) {
              setSelectedProduct(null);
            }
          } catch (err) {
            Alert.alert('Erreur', getErrorMessage(err));
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement des produits...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion de Produits REST</Text>

      <ProductForm
        onSubmit={handleFormSubmit}
        onCancel={() => setSelectedProduct(null)}
        initialData={selectedProduct}
        disabled={saving}
      />

      {saving ? <ActivityIndicator style={styles.saving} color="#0000ff" /> : null}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Réessayer" onPress={onRefresh} />
        </View>
      ) : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !error ? <Text style={styles.empty}>Aucun produit.</Text> : null
        }
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onEdit={setSelectedProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  saving: { marginBottom: 10 },
  errorBox: { alignItems: 'center', marginBottom: 10 },
  errorText: { color: '#d9534f', marginBottom: 6 },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
});
