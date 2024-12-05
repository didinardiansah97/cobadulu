  "use client";
  import { useState, useMemo } from 'react';

  export default function Home() {
    const [formData, setFormData] = useState({
      nama: "",
      umur: "",
      pengenMakan: "",
      selectedSakit: "",
    });

    const [selectedMenu, setSelectedMenu] = useState({
      karbohidrat: '',
      protein: '',
      sayur: '',
      buah: '',
      subKarbohidrat: '', // Menyimpan sub-opsi karbohidrat
    });

    const [subMenu, setSubMenu] = useState<{ id: string; name: string}[]>([]); // Menyimpan sub-opsi dinamis

    const sakitOptions = [
      { id: 'flu', name: 'Flu' },
      { id: 'demam', name: 'Demam' },
      { id: 'batuk', name: 'Batuk' },
      { id: 'migrain', name: 'Migrain' },
    ];

    const giziOptions = {
      Karbohidrat: [
        { id: 'ubi', name: 'Ubi Jalar', subOptions: [
            { id: 'ubi-kuning', name: 'Ubi Jalar Kuning' },
            { id: 'ubi-ungu', name: 'Ubi Jalar Ungu' },
          ] 
        },
        { id: 'makaroni', name: 'Makaroni' },
      ],
      Protein: [
        { id: 'ikan', name: 'Ikan' },
        { id: 'ayam', name: 'Ayam' },
      ],
      Sayur: [
        { id: 'bayam', name: 'Bayam' },
        { id: 'kangkung', name: 'Kangkung' },
      ],
      Buah: [
        { id: 'apel', name: 'Apel' },
        { id: 'jeruk', name: 'Jeruk' },
      ],
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleMenuSelect = (type, value) => {
      setSelectedMenu((prev) => ({ ...prev, [type]: value }));

      if (type === 'karbohidrat') {
        const selectedOption = giziOptions.Karbohidrat.find((item) => item.id === value);
        setSubMenu(selectedOption?.subOptions || []);
        setSelectedMenu((prev) => ({ ...prev, subKarbohidrat: '' })); // Reset sub-opsi ketika memilih karbohidrat baru
      }
    };  

    const isComplete =
      selectedMenu.karbohidrat &&
      selectedMenu.protein &&
      selectedMenu.sayur &&
      selectedMenu.buah &&
      (!subMenu.length || selectedMenu.subKarbohidrat);
      Object.values(selectedMenu).every((item) => item !== '');

    return (
      <div style={{ padding: '2rem' }}>
        <h1>Rekomendasi Menu</h1>
        
        {/* Input Nama */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Nama:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            style={{ marginLeft: '1rem' }}
          />
        </div>

        {/* Input Umur */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Umur:</label>
          <input
            type="number"
            name="umur"
            value={formData.umur}
            onChange={handleInputChange}
            style={{ marginLeft: '1rem' }}
          />
        </div>

        {/* Input Pengen Makan Apa */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Pengen Makan Apa:</label>
          <input
            type="text"
            name="pengenMakan"
            value={formData.pengenMakan}
            onChange={handleInputChange}
            style={{ marginLeft: '1rem' }}
          />
        </div>

        {/* Pilihan Penyakit */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Penyakit:</label>
          <select
            name="selectedSakit"
            value={formData.selectedSakit}
            onChange={handleInputChange}
            style={{ marginLeft: '1rem' }}
          >
            <option value="">Pilih Penyakit</option>
            {sakitOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pilihan Gizi jika penyakit telah dipilih */}
        {formData.selectedSakit && (
          <div style={{ marginTop: '2rem', backgroundColor: '#d4edda', padding: '1rem' }}>
            <h2>Pilih Menu Makanan</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label>Karbohidrat:</label>
              <select
                onChange={(e) => handleMenuSelect('karbohidrat', e.target.value)}
                style={{ marginLeft: '1rem' }}
              >
                <option value="">Pilih Karbohidrat</option>
                {giziOptions.Karbohidrat.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-opsi untuk Karbohidrat */}
            {subMenu.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>Sub-opsi Karbohidrat:</label>
                <select
                  onChange={(e) => handleMenuSelect('subKarbohidrat', e.target.value)}
                  style={{ marginLeft: '1rem' }}
                >
                  <option value="">Pilih Sub-opsi</option>
                  {subMenu.map((subOption) => (
                    <option key={subOption.id} value={subOption.id}>
                      {subOption.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pilihan Protein, Sayur, dan Buah */}
            <div style={{ marginBottom: '1rem' }}>
              <label>Protein:</label>
              <select
                onChange={(e) => handleMenuSelect('protein', e.target.value)}
                style={{ marginLeft: '1rem' }}
              >
                <option value="">Pilih Protein</option>
                {giziOptions.Protein.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>Sayur:</label>
              <select
                onChange={(e) => handleMenuSelect('sayur', e.target.value)}
                style={{ marginLeft: '1rem' }}
              >
                <option value="">Pilih Sayur</option>
                {giziOptions.Sayur.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>Buah:</label>
              <select
                onChange={(e) => handleMenuSelect('buah', e.target.value)}
                style={{ marginLeft: '1rem' }}
              >
                <option value="">Pilih Buah</option>
                {giziOptions.Buah.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Hasil */}
        {isComplete && (
          <div style={{ marginTop: '2rem', backgroundColor: '#d1ecf1', padding: '1rem' }}>
            <h2>Rekomendasi Makanan</h2>
            <p><strong>Nama:</strong> {formData.nama}</p>
            <p><strong>Umur:</strong> {formData.umur}</p>
            <p><strong>Pengen Makan:</strong> {formData.pengenMakan}</p>
            <p><strong>Penyakit:</strong> {sakitOptions.find((s) => s.id === formData.selectedSakit)?.name}</p>
            <p><strong>Karbohidrat:</strong> {giziOptions.Karbohidrat.find((k) => k.id === selectedMenu.karbohidrat)?.name}</p>
            <p><strong>Sub-opsi Karbohidrat:</strong> {giziOptions.Karbohidrat.find((k) => k.id === selectedMenu.karbohidrat)?.subOptions.find((sub) => sub.id === selectedMenu.subKarbohidrat)?.name}</p>
            <p><strong>Protein:</strong> {giziOptions.Protein.find((p) => p.id === selectedMenu.protein)?.name}</p>
            <p><strong>Sayur:</strong> {giziOptions.Sayur.find((s) => s.id === selectedMenu.sayur)?.name}</p>
            <p><strong>Buah:</strong> {giziOptions.Buah.find((b) => b.id === selectedMenu.buah)?.name}</p>
          </div>
        )}
      </div>
    );
  }
