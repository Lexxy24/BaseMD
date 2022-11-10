const axios = require("axios")

// STALKER FF
exports.stalkff = async(id) => {
return new Promise(async (resolve, reject) => {
axios
.post(
'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
new URLSearchParams(
Object.entries({
productId: '3',
itemId: '353',
catalogId: '376',
paymentId: '2037',
gameId: id,
product_ref: 'REG',
product_ref_denom: 'AE',
})
),
{
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
Referer: 'https://www.duniagames.co.id/',
Accept: 'application/json',
},
}
)
.then((response) => {
resolve({
status: 200,
id: id,
nickname: response.data.data.gameDetail.userName
})
})
.catch((err) => {
resolve({
status: 404,
msg: 'User Id Not Found'
})
})
})
}