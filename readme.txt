- Merchant Database
	- Database : MYSQL
STEP
	- User harus login terlebih dahulu sehingga
	  mendapatkan bearer token untuk dapat 
	  mengakses beberapa Api seperti
		- Update User
		- Remove User
		- Get all user
		- Get Detail User
		- Add Product
		- Remove Product
		- Update Product
		- Get detail Product

	- Setelah login user akan di berikan access token dan refresh
	  token yang mana dapat digunakan.
	  Ketika access token telah expired maka user
	  tetap dapat mengakses Api tampa perlu melakukan
	  login ulang, karena refresh token tersimpan di cookie
	  ini juga berfungsi untuk mengoptimalkan
	  security pada API

	- Setelah User Log Out maka refresh token juga akan
	  dihilangkan dari cookies dan database sehingga perlu melakukan
	  login ulang