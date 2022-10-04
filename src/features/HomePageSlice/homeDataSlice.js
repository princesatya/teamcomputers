import { createSlice } from '@reduxjs/toolkit';

const STATIC_DATA = {
	"info": {
		"_postman_id": "fd21894a-2c7e-4a25-8ce2-61c6e8ead142",
		"name": "Team Computer",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Banner",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query{\r\n  sliderdata{\r\n  banner_id\r\n    status\r\n  title\r\n  sub_title\r\n    image\r\n    url_banner\r\n  buy_now_url\r\n\r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Accessories",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "{\r\n\r\nproducts(\r\n\r\nfilter: {category_id: {eq: \"11\"}},\r\n\r\nsort: {name: ASC},\r\n\r\npageSize: 2,\r\n\r\ncurrentPage: 1\r\n\r\n) {\r\n\r\ntotal_count\r\n\r\nitems {\r\n\r\nname\r\n\r\nsku\r\n\r\nprice_range {\r\n\r\nminimum_price {\r\n\r\nregular_price {\r\n\r\nvalue\r\n\r\ncurrency\r\n\r\n}\r\n\r\nfinal_price {\r\n\r\nvalue\r\n\r\ncurrency\r\n\r\n}\r\n\r\ndiscount {\r\n\r\namount_off\r\n\r\npercent_off\r\n\r\n}\r\n\r\n}\r\n\r\nmaximum_price {\r\n\r\nregular_price {\r\n\r\nvalue\r\n\r\ncurrency\r\n\r\n}\r\n\r\nfinal_price {\r\n\r\nvalue\r\n\r\ncurrency\r\n\r\n}\r\n\r\ndiscount {\r\n\r\namount_off\r\n\r\npercent_off\r\n\r\n}\r\n\r\n}\r\n\r\n}\r\n\r\n}\r\n\r\n}\r\n\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Category List",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query{\r\n  categoryList(\r\n    filters: {\r\n      parent_id: {in: [\"2\"]}\r\n    }\r\n  ) {\r\n    name\r\n     url_path\r\n    url_key\r\n    children_count\r\n    children {\r\n      uid\r\n      level\r\n      name\r\n      path\r\n      url_path\r\n      url_key\r\n      children {\r\n        uid\r\n        level\r\n        name\r\n        path\r\n        url_path\r\n        url_key\r\n      }\r\n    }\r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "New Launches Sku",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query {\r\n  storeConfig {\r\n   \r\n    new_launch_sku\r\n  \r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Store Config",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query {\r\n  storeConfig {\r\n    id\r\n    code\r\n    website_id\r\n    locale\r\n    base_currency_code\r\n    default_display_currency_code\r\n    timezone\r\n    weight_unit\r\n    base_url\r\n    base_link_url\r\n    base_static_url\r\n    base_media_url\r\n    secure_base_url\r\n    secure_base_link_url\r\n    secure_base_static_url\r\n    secure_base_media_url\r\n    store_name\r\n    new_launch_sku\r\n  \r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "New Launches",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query {\r\n  productDetail: products(\r\n    pageSize: 5\r\n    filter: {\r\n       sku: { in: [\"MGN93HN/A\",\"MGND3HN/A\"] }\r\n    }\r\n  ) {\r\n    total_count\r\n    items {\r\n      sku\r\n      uid\r\n      name\r\n      short_description{html}\r\n      image {\r\n        url\r\n        label\r\n      }\r\n      small_image{\r\n          url\r\n          label\r\n      }\r\n      media_gallery {\r\n          url\r\n          label\r\n          ... on ProductVideo {\r\n              video_content {\r\n                  media_type\r\n                  video_provider\r\n                  video_url\r\n                  video_title\r\n                  video_description\r\n                  video_metadata\r\n              }\r\n          }\r\n      }\r\n\t  related_products {\r\n        uid\r\n        name\r\n      }\r\n      upsell_products {\r\n        uid\r\n        name\r\n      }\r\n      crosssell_products {\r\n        uid\r\n        name\r\n      }\r\n\t   price_range {\r\n        minimum_price {\r\n          regular_price {\r\n            value\r\n            currency\r\n          }\r\n          final_price {\r\n            value\r\n            currency\r\n          }\r\n          discount {\r\n            amount_off\r\n            percent_off\r\n          }\r\n        }\r\n        maximum_price {\r\n          regular_price {\r\n            value\r\n            currency\r\n          }\r\n          final_price {\r\n            value\r\n            currency\r\n          }\r\n          discount {\r\n            amount_off\r\n            percent_off\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "About Us",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query{\r\n  cmsBlocks(identifiers: \"about-home\") {\r\n    items {\r\n      identifier\r\n      title\r\n      content\r\n    }\r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Footer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query{\r\n  sliderdata{\r\n  banner_id\r\n    status\r\n  title\r\n  sub_title\r\n    image\r\n    url_banner\r\n  buy_now_url\r\n\r\n  }\r\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "http://13.68.224.224/pub/graphql",
					"protocol": "http",
					"host": [
						"13",
						"68",
						"224",
						"224"
					],
					"path": [
						"pub",
						"graphql"
					]
				}
			},
			"response": []
		}
	]
}

// const BANNER_DATA = [{"banner_id":1,"status":1,"title":"Apple Launch","sub_title":null,"image":"http://13.68.224.224/pub/media/mageplaza/bannerslider/banner/image/s/1/s1.jpg","url_banner":null,"buy_now_url":null},{"banner_id":2,"status":1,"title":"Apple Watch","sub_title":null,"image":"http://13.68.224.224/pub/media/mageplaza/bannerslider/banner/image/s/2/s2.jpg","url_banner":null,"buy_now_url":null},{"banner_id":3,"status":1,"title":"Apple Phones","sub_title":"Apple sub title","image":"http://13.68.224.224/pub/media/mageplaza/bannerslider/banner/image/s/3/s3.jpg","url_banner":"https://www.apple.com/in/mac/","buy_now_url":"http://13.68.224.224/checkout/cart/add/"}]
// const CATEGORIES_DATA = [{"name":"Mac","url_path":"mac","url_key":"mac","children_count":"10","children":[{"uid":"NQ==","level":3,"name":"MacBook Air","path":"1/2/4/5","url_path":"mac/macbook-air","url_key":"macbook-air","children":[]},{"uid":"Ng==","level":3,"name":"MacBook Pro","path":"1/2/4/6","url_path":"mac/macbook-pro","url_key":"macbook-pro","children":[]},{"uid":"Nw==","level":3,"name":"Mac mini","path":"1/2/4/7","url_path":"mac/mac-mini","url_key":"mac-mini","children":[]},{"uid":"OA==","level":3,"name":"Mac Studio","path":"1/2/4/8","url_path":"mac/mac-studio","url_key":"mac-studio","children":[]},{"uid":"OQ==","level":3,"name":"iMac","path":"1/2/4/9","url_path":"mac/imac","url_key":"imac","children":[]},{"uid":"MTA=","level":3,"name":"Mac Apple Care","path":"1/2/4/10","url_path":"mac/mac-apple-care","url_key":"mac-apple-care","children":[]},{"uid":"Njc=","level":3,"name":"Mac miniacBook Air","path":"1/2/4/67","url_path":"mac/mac-miniacbook-air","url_key":"mac-miniacbook-air","children":[]},{"uid":"OTM=","level":3,"name":"MacBook Pro 13in","path":"1/2/4/93","url_path":"mac/macbook-pro-13in","url_key":"macbook-pro-13in","children":[]},{"uid":"OTQ=","level":3,"name":"MacBook Pro 14in","path":"1/2/4/94","url_path":"mac/macbook-pro-14in","url_key":"macbook-pro-14in","children":[]},{"uid":"OTU=","level":3,"name":"MacBook Pro 16in","path":"1/2/4/95","url_path":"mac/macbook-pro-16in","url_key":"macbook-pro-16in","children":[]}]},{"name":"iPhone","url_path":"iphone","url_key":"iphone","children_count":"15","children":[{"uid":"MTI=","level":3,"name":"iPhone 13 Pro Max","path":"1/2/11/12","url_path":"iphone/iphone-13-pro-max","url_key":"iphone-13-pro-max","children":[]},{"uid":"MTM=","level":3,"name":"iPhone 13 Pro","path":"1/2/11/13","url_path":"iphone/iphone-13-pro","url_key":"iphone-13-pro","children":[]},{"uid":"MTQ=","level":3,"name":"iPhone 13","path":"1/2/11/14","url_path":"iphone/iphone-13","url_key":"iphone-13","children":[]},{"uid":"MTU=","level":3,"name":"iPhone 13 mini","path":"1/2/11/15","url_path":"iphone/iphone-13-mini","url_key":"iphone-13-mini","children":[]},{"uid":"MTY=","level":3,"name":"iPhone 12","path":"1/2/11/16","url_path":"iphone/iphone-12","url_key":"iphone-12","children":[]},{"uid":"MTc=","level":3,"name":"iPhone 12 mini","path":"1/2/11/17","url_path":"iphone/iphone-12-mini","url_key":"iphone-12-mini","children":[]},{"uid":"MTg=","level":3,"name":"iPhone 11","path":"1/2/11/18","url_path":"iphone/iphone-11","url_key":"iphone-11","children":[]},{"uid":"MTk=","level":3,"name":"iPhone SE","path":"1/2/11/19","url_path":"iphone/iphone-se","url_key":"iphone-se","children":[]},{"uid":"MjA=","level":3,"name":"iPhone AppleCare","path":"1/2/11/20","url_path":"iphone/iphone-applecare","url_key":"iphone-applecare","children":[]},{"uid":"ODc=","level":3,"name":"12","path":"1/2/11/87","url_path":"iphone/12","url_key":"12","children":[]},{"uid":"ODg=","level":3,"name":"13 MINI","path":"1/2/11/88","url_path":"iphone/13-mini","url_key":"13-mini","children":[]},{"uid":"ODk=","level":3,"name":"13 PRO","path":"1/2/11/89","url_path":"iphone/13-pro","url_key":"13-pro","children":[]},{"uid":"OTA=","level":3,"name":"13 PRO MAX","path":"1/2/11/90","url_path":"iphone/13-pro-max","url_key":"13-pro-max","children":[]},{"uid":"OTE=","level":3,"name":"iPhone SE 3","path":"1/2/11/91","url_path":"iphone/iphone-se-3","url_key":"iphone-se-3","children":[]},{"uid":"OTI=","level":3,"name":"SE 3rd Gen","path":"1/2/11/92","url_path":"iphone/se-3rd-gen","url_key":"se-3rd-gen","children":[]}]},{"name":"Watch","url_path":"watch","url_key":"watch","children_count":"5","children":[{"uid":"OTY=","level":3,"name":"Series 3 GPS","path":"1/2/21/96","url_path":"watch/series-3-gps","url_key":"series-3-gps","children":[]},{"uid":"OTc=","level":3,"name":"Series 7 GPS","path":"1/2/21/97","url_path":"watch/series-7-gps","url_key":"series-7-gps","children":[]},{"uid":"OTg=","level":3,"name":"Series 7 GPS + Cell","path":"1/2/21/98","url_path":"watch/series-7-gps-cell","url_key":"series-7-gps-cell","children":[]},{"uid":"OTk=","level":3,"name":"Series SE GPS","path":"1/2/21/99","url_path":"watch/series-se-gps","url_key":"series-se-gps","children":[]},{"uid":"MTAw","level":3,"name":"Series SE GPS + Cell","path":"1/2/21/100","url_path":"watch/series-se-gps-cell","url_key":"series-se-gps-cell","children":[]}]},{"name":"iPad","url_path":"ipad","url_key":"ipad","children_count":"10","children":[{"uid":"MjQ=","level":3,"name":"iPad Pro","path":"1/2/22/24","url_path":"ipad/ipad-pro","url_key":"ipad-pro","children":[]},{"uid":"MjU=","level":3,"name":"iPad Air","path":"1/2/22/25","url_path":"ipad/ipad-air","url_key":"ipad-air","children":[]},{"uid":"MjY=","level":3,"name":"iPad mini","path":"1/2/22/26","url_path":"ipad/ipad-mini","url_key":"ipad-mini","children":[]},{"uid":"Mjc=","level":3,"name":"iPad Demo","path":"1/2/22/27","url_path":"ipad/ipad-demo","url_key":"ipad-demo","children":[]},{"uid":"Mjg=","level":3,"name":"iPad AppleCare","path":"1/2/22/28","url_path":"ipad/ipad-applecare","url_key":"ipad-applecare","children":[]},{"uid":"ODA=","level":3,"name":"iPad 9th Gen","path":"1/2/22/80","url_path":"ipad/ipad-9th-gen","url_key":"ipad-9th-gen","children":[]},{"uid":"ODE=","level":3,"name":"iPad Air 5","path":"1/2/22/81","url_path":"ipad/ipad-air-5","url_key":"ipad-air-5","children":[]},{"uid":"ODI=","level":3,"name":"iPad Mini 6th Gen","path":"1/2/22/82","url_path":"ipad/ipad-mini-6th-gen","url_key":"ipad-mini-6th-gen","children":[]},{"uid":"ODM=","level":3,"name":"iPad Pro 11in","path":"1/2/22/83","url_path":"ipad/ipad-pro-11in","url_key":"ipad-pro-11in","children":[]},{"uid":"ODQ=","level":3,"name":"iPad Pro 13in (4th Gen)","path":"1/2/22/84","url_path":"ipad/ipad-pro-13in-4th-gen","url_key":"ipad-pro-13in-4th-gen","children":[]}]},{"name":"Accessories","url_path":"accessories","url_key":"accessories","children_count":"10","children":[{"uid":"NzA=","level":3,"name":"Airpods","path":"1/2/69/70","url_path":"accessories/airpods","url_key":"airpods","children":[]},{"uid":"NzI=","level":3,"name":"AirTag","path":"1/2/69/72","url_path":"accessories/airtag","url_key":"airtag","children":[]},{"uid":"NzM=","level":3,"name":"AirTag acc.","path":"1/2/69/73","url_path":"accessories/airtag-acc","url_key":"airtag-acc","children":[]},{"uid":"NzQ=","level":3,"name":"Beats","path":"1/2/69/74","url_path":"accessories/beats","url_key":"beats","children":[]},{"uid":"NzU=","level":3,"name":"Cases & Covers","path":"1/2/69/75","url_path":"accessories/cases-covers","url_key":"cases-covers","children":[]},{"uid":"NzY=","level":3,"name":"Converter & Connector","path":"1/2/69/76","url_path":"accessories/converter-connector","url_key":"converter-connector","children":[]},{"uid":"Nzc=","level":3,"name":"Core Accessories","path":"1/2/69/77","url_path":"accessories/core-accessories","url_key":"core-accessories","children":[]},{"uid":"Nzg=","level":3,"name":"HomePod","path":"1/2/69/78","url_path":"accessories/homepod","url_key":"homepod","children":[]},{"uid":"Nzk=","level":3,"name":"Watch Acc.","path":"1/2/69/79","url_path":"accessories/watch-acc","url_key":"watch-acc","children":[]},{"uid":"ODY=","level":3,"name":"AirTag aac.","path":"1/2/69/86","url_path":"accessories/airtag-aac","url_key":"airtag-aac","children":[]}]}]
// const ACCESSORIES_DATA=[{"name":"IPHONE 11 128GB (PRODUCT)RED   WRLS","sku":"MHDK3HN/A","price_range":{"minimum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}},"maximum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}}}},{"name":"IPHONE 11 128GB BLACK          WRLS","sku":"MHDH3HN/A","price_range":{"minimum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}},"maximum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}}}}]
// const NEWLAUNCHES_DATA =[{"sku":"MGN93HN/A","uid":"MTUyOA==","name":"MBA 13.3 SLV/8C CPU/7C GPU     SYST","short_description":{"html":""},"image":{"url":"http://13.68.224.224/pub/media/catalog/product/placeholder/default/placeholder.jpg","label":"MBA 13.3 SLV/8C CPU/7C GPU     SYST"},"small_image":{"url":"http://13.68.224.224/pub/media/catalog/product/placeholder/default/placeholder_1.jpg","label":"MBA 13.3 SLV/8C CPU/7C GPU     SYST"},"media_gallery":[],"related_products":[],"upsell_products":[],"crosssell_products":[],"price_range":{"minimum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}},"maximum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}}}},{"sku":"MGND3HN/A","uid":"MTUyNw==","name":"13MBA APPLE M1 CHIP W 8-CORE   SYST","short_description":{"html":""},"image":{"url":"http://13.68.224.224/pub/media/catalog/product/placeholder/default/placeholder.jpg","label":"13MBA APPLE M1 CHIP W 8-CORE   SYST"},"small_image":{"url":"http://13.68.224.224/pub/media/catalog/product/placeholder/default/placeholder_1.jpg","label":"13MBA APPLE M1 CHIP W 8-CORE   SYST"},"media_gallery":[],"related_products":[],"upsell_products":[],"crosssell_products":[],"price_range":{"minimum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}},"maximum_price":{"regular_price":{"value":0,"currency":"INR"},"final_price":{"value":0,"currency":"INR"},"discount":{"amount_off":0,"percent_off":0}}}}]

export const homeDataSlice = createSlice({
	name: 'homepage',
	initialState: {
		banners: [],
		categories: [],
		accessories: [],
		newlaunches: [],
		productlist: [],
		aboutus: [],
		genetrateotp: [],
		homecategorysection: [],
		categoryinfo: [],
		storeconfig: [],
		categoryBreadcrumbs: [],
		categoryProducts: [],
		productDetails: [],
		subcategory: [],
		addtoproductcart: [],
		appliedCoupon: null,
		cartPrices: null,
		shippingAddresses: [],
		customerresult: [],
		wishlist: [],
		addproductwishlist: [],
		getcustomer: [],
		getcomparelist: [],
		createcomparelist: [],
		getaddresslist: [],
		getcategoryProduct: [],
		getcustomerorderlist: [],
		getorderdetail: [],
		getrelatedproduct:[],
		getShippingMethod:[],
		shippingAddress: {},
		getPaymentMethod:[],
		orderItems: {},
		selectedPaymentMethod:[],
		aboutUsData:[],
		cmsPage:[],
		country:[],
		blog:[]


	},
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		saveCatagory: (state, action) => {
			state.categories = action.payload;
		},
		saveBanner: (state, action) => {
			state.banners = action.payload;
		},
		saveAccessories: (state, action) => {
			state.accessories = action.payload;
		},
		saveNewlaunches: (state, action) => {
			state.newlaunches = action.payload;
		},
		saveProductlist: (state, action) => {
			state.productlist = action.payload;
		},
		saveaboutus: (state, action) => {
			state.aboutus = action.payload;
		},
		savegenetrateotp: (state, action) => {
			state.genetrateotp = action.payload;
		},
		savehomecategorysection: (state, action) => {
			state.homecategorysection = action.payload;
		},

		savecatagoryinfo: (state, action) => {
			state.categoryinfo = action.payload;
		},
		savestoreconfig: (state, action) => {
			state.storeconfig = action.payload;
		},

		savecategoryBreadcrumbs: (state, action) => {
			state.categoryBreadcrumbs = action.payload;
		},
		savecategoryProducts: (state, action) => {
			state.categoryProducts = action.payload;
		},
		saveproductDetails: (state, action) => {
			state.productDetails = action.payload;
		},
		savesubcategory: (state, action) => {
			state.subcategory = action.payload;
		},
		savewishlist: (state, action) => {
			state.wishlist = action.payload;
		},

		saveaddtoproductcart: (state, action) => {
			const {items, applied_coupons, prices, shipping_addresses} = action.payload;
			state.addtoproductcart = items;
			state.appliedCoupon = applied_coupons;
			state.cartPrices = prices;
			state.shippingAddresses = shipping_addresses;
		},
		savecustomerresult: (state, action) => {
			state.customerresult = action.payload;
		},
		saveaddproductwishlist: (state, action) => {
			state.addproductwishlist = action.payload;
		},
		savegetcustomer: (state, action) => {
			state.getcustomer = action.payload;
		},
		savegetcomparelist: (state, action) => {
			state.getcomparelist = action.payload;
		},
		savecreatecomparelist: (state, action) => {
			state.createcomparelist = action.payload;
		},
		savegetaddresslist: (state, action) => {
			state.getaddresslist = action.payload;
		},
		savecategoryProduct: (state, action) => {
			state.getcategoryProduct = action.payload;
		},
		savecustomerorderlist: (state, action) => {
			state.getcustomerorderlist = action.payload;
		},
		savegetorderdetail: (state, action) => {
			state.getorderdetail = action.payload;
		},
		
		savegetrelatedproduct: (state, action) => {
			state.getrelatedproduct = action.payload;
		},
		saveShippingMethod: (state, action) => {
			state.getShippingMethod = action.payload;
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},
		saveAvailablePaymentMethod: (state, action) => {
			state.getPaymentMethod = action.payload;
		},
		saveSelectedPaymentMethod: (state, action) => {
			state.selectedPaymentMethod = action.payload;
		},
		saveAboutUsData: (state, action) => {
			state.aboutUsData = action.payload;
		},
		savecmsPage: (state, action) => {
			state.cmsPage = action.payload;
		},
		saveGetRegion: (state, action) => {
			state.country = action.payload;
		},
		saveOrderItems: (state, action) => {
			state.orderItems = action.payload;
		},
		saveBlog: (state, action) => {
			state.blog = action.payload;
		}
		
	},
});

export const {
	saveBanner,
	saveCatagory,
	saveAccessories,
	saveNewlaunches,
	saveProductlist,
	saveaboutus,
	savegenetrateotp,
	savehomecategorysection,
	savecatagoryinfo,
	savestoreconfig,
	savecategoryBreadcrumbs,
	savecategoryProducts,
	saveproductDetails,
	savesubcategory,
	saveaddtoproductcart,
	savecustomerresult,
	savewishlist,
	saveaddproductwishlist,
	savegetcustomer,
	savegetcomparelist,
	savecreatecomparelist,
	savegetaddresslist,
	savecategoryProduct,
	savecustomerorderlist,
	savegetorderdetail,
	savegetrelatedproduct,
	saveShippingMethod,
	saveShippingAddress,
	saveAvailablePaymentMethod,
	saveSelectedPaymentMethod,
	saveOrderItems,
	saveAboutUsData,
	savecmsPage,
	saveGetRegion,
	saveBlog
} = homeDataSlice.actions;

export default homeDataSlice.reducer;
