# Journey

## Day 1

### Setup Project: Tema Aplikasi, Apollo Server, GraphQL
Silahkan setup project aplikasi server kamu:
- [X] Install MongoDB database pada komputer kamu atau menggunakan MongoDB Atlas
- [X] Install package yang dibutuhkan: @apollo/server, graphql dan mongodb sebagai MongoDB driver
- [X] Pilih tema sesuai dengan pilihan dan kesepakatan instructor, tuliskan dalam README github kamu
- [X] Buatlah aplikasi server GraphQL menggunakan Apollo Server dengan PORT default: 3000


### GraphQL - Apollo Server
Buatlah Aplikasi server GraphQL dengan menggunakan Apollo Server yang memiliki fungsi sebagai berikut:
- [X] Register (Mutation)
- [X] Login (Query)
- [X] Get Post (Query)
- [X] Add Post (Mutation)
- [X] Comment Post (Mutation)
- [X] Search User (Query)
- [X] Follow (Mutation)
- [X] Get User (Query)
- [X] Like Post (Mutation)

### MongoDB 1
Buatlah fungsi/method pada aplikasi server GraphQL kamu yang menghubungkan dengan database MongoDB dengan fungsi sebagai berikut:
- [X] Add user: untuk kebutuhan register
- [X] Get user by username dan password: untuk kebutuhan login
- [X] Search users by name/username: untuk kebutuhan mencari user berdasarkan nama atau username
- [X] Follow User: untuk kebutuhan memfollow user
- [X] Get User by Id: untuk menampilkan profile user
- [X] Add Post: untuk menambahkan post baru
- [X] Get Posts: mengambil daftar post berdasarkan yang terbaru
- [X] Get Post by Id: mengambil post berdasarkan id
- [X] Comment Post: untuk menambahkan komentar pada post
- [X] Like Post: untuk menambahkan like pada post


## Day 2

### MongoDB 2
Buatlah lookup/relasi pada method/fungsi yang berhubungan dengan MongoDB yang sudah kamu buat dengan rincian sebagai berikut:
- [X] Get Post by Id: mengambil post berdasarkan id
  - [X] Menampilkan nama/username user pada data komentar

- [X] Get User by Id: untuk menampilkan profile user
  - [X] Menampilkan list nama/username user follower
  - [X] Menampilkan list nama/username user following


### Redis - Cache
Implementasikan cache pada aplikasi GraphQL server yang sudah dibuat dengan detail sebagai berikut:
- [X] Implementasikan cache pada Get Post (Query)
- [X] Invalidate cache pada Add Post (Mutation)

## Day 3
### React Native
Buatlah aplikasi mobile React-Native dengan menggunakan expo. Aplikasi ini adalah client side dari challenge My Social Media App.
Pada aplikasi ini kamu perlu membuat screen sebagai berikut:
- [X] Unauthenticate screen
  - [X] Login Screen: Menampilkan form untuk login
  - [X] Register Screen: Menampilkan form untuk register

- [X] Authenticate screen
  - [X] Home screen: Menampilkan list post
  - [X] Create Post: Menampilkan form untuk menambahkan post baru
  - [X] Post Detail Screen: Menampilkan post detail berdasarkan id dan form untuk komentar
  - [X] Search Screen: Menampilkan form pencarian untuk mencari user (bisa digabung dengan screen lain)
  - [X] Profile Screen: Menampilkan profile user berdasarkan id, serta menampilkan jumlah followings dan followers user.


### React Navigation
 - [X] Implementasikan navigasi pada screen yang sudah kamu buat dengan menggunakan React Navigation.


## Day 4
### GraphQL - Apollo Client
Lakukan komunikasi Aplikasi Mobile (react-native) menggunakan apollo client ke server GraphQL  yang sudah dibuat. Dan Implementasikan query dan mutation sesuai dengan kebutuhan.
- [X] Register (Mutation)
- [X] Login (Query)
- [X] Get Post (Query)
- [X] Add Post (Mutation)
- [X] Comment Post (Mutation)
- [X] Search User (Query)
- [X] Follow (Mutation)
- [X] Get User (Query)
- [X] Like Post (Mutation)

