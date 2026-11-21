import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProductForm({ onSubmit, onCancel, initialData, disabled }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mode édition : on remplit le formulaire. Sinon on le vide.
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPrice(String(initialData.price));
    } else {
      setTitle('');
      setPrice('');
    }
    setErrorMessage('');
  }, [initialData]);

  const validateAndSubmit = () => {
    if (!title.trim()) {
      setErrorMessage('Le titre est obligatoire.');
      return;
    }
    const numericPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setErrorMessage('Veuillez entrer un prix valide.');
      return;
    }
    setErrorMessage('');
    onSubmit({ title: title.trim(), price: numericPrice });
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Titre du produit"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Prix"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        title={initialData ? 'Modifier' : 'Ajouter'}
        onPress={validateAndSubmit}
        disabled={disabled}
      />
      {initialData ? (
        <View style={styles.cancel}>
          <Button title="Annuler" color="#888" onPress={onCancel} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: { color: '#d9534f', marginBottom: 10 },
  cancel: { marginTop: 8 },
});
