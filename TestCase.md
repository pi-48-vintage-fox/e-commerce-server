| Success Test case    | 1. CRUD Product                                              |
| -------------------- | ------------------------------------------------------------ |
|                      | **2. Login**                                                 |
| **FAILED TEST CASE** |                                                              |
| - Login              | Email ditemukan di db namun password salah                   |
|                      | Email tidak ditemukan di db                                  |
|                      | Email dan password kosong                                    |
| - Create Product     | Tidak ada access_token                                       |
|                      | Ada access_token namun bukan milik admin                     |
|                      | Validation error (Field yang di required tidak di isi)       |
|                      | Stock di isi angka kurang dari 0 (minus)                     |
|                      | Price di isi angka kruang dari 0 (minus)                     |
|                      | Field number di isi dengan tipe data yang tidak sesuai "string" (cth. field price diisi string) |
| - Update Product     | Tidak ada access_token                                       |
|                      | Ada access_token namun bukan milik admin                     |
|                      | Stock di isi angka kurang dari 0 (minus)                     |
|                      | Price di isi angka kruang dari 0 (minus)                     |
| `                    | Field number di isi dengan tipe data yang tidak sesuai "string" (cth. field price diisi string) |
| - Delete product     | Tidak ada access_token                                       |
|                      | Ada access_token namun bukan milik admin                     |
| - Read product       | Response                                                     |