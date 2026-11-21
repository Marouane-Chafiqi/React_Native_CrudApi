import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{product.price} €</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(product)} style={styles.editBtn}>
          <Text style={styles.btnText}>Éditer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(product.id)} style={styles.deleteBtn}>
          <Text style={styles.btnText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  info: { flex: 1, paddingRight: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  editBtn: { backgroundColor: '#f0ad4e', padding: 8, borderRadius: 5, marginRight: 5 },
  deleteBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
