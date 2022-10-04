import { gql } from '@apollo/client'

// Store Config
export const STORE_CONFIG = gql`
query {
  storeConfig {
    id
    code
    website_id
    locale
    base_currency_code
    default_display_currency_code
    timezone
    weight_unit
    base_url
    base_link_url
    base_static_url
    base_media_url
    secure_base_url
    secure_base_link_url
    secure_base_static_url
    secure_base_media_url
    store_name
    new_launch_sku
    accessories_category_id
    home_categories
    magento_wishlist_general_is_enabled
    default_title
    default_keywords
    welcome
    default_description
    support_email
    support_phone
     
    
  }
}
`
// Banner
export const BANNERS = gql`
query{
  sliderdata{
  banner_id
    status
  title
  sub_title
    image
    url_banner
  buy_now_url
  }
}
`

export const CATEGORIES = gql`
query{
  categoryList(
    filters: {
      parent_id: {in: ["2"]}
    }
  ) {
    id
    name
    image
     url_path
    url_key
    children_count
    children {
      uid
      level
      name
      path
      image
      url_path
      url_key
      children {
        uid
        level
        name
        path
        url_path
        url_key
      }
    }
  }
}
`
// ["MGN93HN/A","MGND3HN/A"]
export const NEWLAUNCHES = gql`
query  ($newLaunchSku: [String]!) {
  productDetail: products(
    pageSize: 5
    filter: {
       sku: { in: $newLaunchSku }
    }
  ) {
    total_count
    items {
      sku
      uid
      name
      short_description{html}
      image {
        url
        label
      }
      small_image{
          url
          label
      }
      media_gallery {
          url
          label
          ... on ProductVideo {
              video_content {
                  media_type
                  video_provider
                  video_url
                  video_title
                  video_description
                  video_metadata
              }
          }
      }
	  related_products {
        uid
        name
      }
      upsell_products {
        uid
        name
      }
      crosssell_products {
        uid
        name
      }
	   price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
    }
  }
}
`

export const ACCESSORIES = gql`
query ($id: String!){
  products(
  filter: {category_id: {eq: $id}},
  sort: {name: ASC},

  currentPage: 1
  ) {
  total_count
  items {
  name
  sku
  image {
          url
          label
        }
  price_range {
  minimum_price {
  regular_price {
  value
  currency
  }
  final_price {
  value
  currency
  }
  discount {
  amount_off
  percent_off
  }
  }
  maximum_price {
  regular_price {
  value
  currency
  }
  final_price {
  value
  currency
  }
  discount {
  amount_off
  percent_off
  }
  }
  }
  }
  }
  }
`

export const PRODUCTLIST = gql`
  query ($id: String!){
    products(filter: { category_id: { eq: $id } }) {
      total_count
        items {
        name
        sku
        image {
          url
          label
        }
  
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
  
      aggregations{
        attribute_code
        label
        count
        options{
          count
          label
          value
        }
        position
      }
    }
  }
  `

export const ABOUTUS = gql`
  query{
    cmsBlocks(identifiers: "about-home") {
      items {
        identifier
        title
        content
      }
    }
  }
  `

export const GENERATEOTP = gql`
  mutation ($email: String!){ generateOtp(
    input : {email: $email}
  ) {
    status
    message
    otp
  }
}
  `

export const VALIDATEOTP = gql`
  mutation ($email: String!, $otp: String!) { validateOtp(
    input : {email: $email
    otp: $otp}
  ) {
    status
    message
    token
  }
}
`

export const HOMECATEGORY = gql`
{
  category (
   id: 69
) {
    id
    level
    name
    url_path
    image


  }
}
`

export const CUSTOMERDATA = gql`
query{
  customer {
  firstname
  lastname
  suffix
  email
  mobile_number
  addresses {
  firstname
  lastname
  street
  city
  region {
  region_code
  region
   }
  postcode
  country_code
  telephone
  }
  }
 }
`

export const CATEGORY_INFO = gql`
query ($id: Int!){
  category (
   id: $id
) {
    id
    description
    level
    name
    url_path
    image
children_count
    children {
      uid
      level
      name
      path
      url_path
      url_key
      children {
        id
        uid
        level
        name
        path
        url_path
        url_key
      }
    }

  }
}
`

export const SUB_CATEGORY = gql`
query ($id: Int!){
  category (
   id: $id
) {
    id
    children_count
    children {
      uid
      id
      level
      name
      path
      image
      url_path
      url_key
      children {
        uid
        id
        level
        name
        path
        url_path
        url_key
      }
    }
  }
}
`

export const CATEGORY_BREADCRUMBS = gql`
query ($id: Int!){
  category (
   id: $id
) {
    id
    level
    name
    breadcrumbs {
      category_id
      category_name
      category_level
      category_url_key
      category_url_path
    }
  }
}

`

export const CATEGORY_PRODUCTS = gql`
query ($id: String!){
  products(filter: {category_id: {eq: $id}}) {
    aggregations {
      attribute_code
      count
      label
      options {
        label
        value
        count
      }
    }
    items {
      name
      sku
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
    }
    page_info {
      page_size
    } 
  } 
}

`

// {category_id: {eq: $id}, price: {from: $from, to: $to}, color: {eq: $color}}
export const CATEGORY_PRODUCTS_FILTER = gql`
query ($filter: ProductAttributeFilterInput){
  products(filter: $filter, pageSize: 25, sort: {name: DESC}) {
    aggregations {
      attribute_code
      count
      label
      options {
        label
        value
        count
      }
    }
    items {
      name
      sku
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
    }
    page_info {
      page_size
    } 
  } 
}

`

export const PRODUCT_DETAILS = gql`
query ($sku: String!){
  products(filter: { sku: { eq: $sku } }) {
    items {
      id
      attribute_set_id
      name
      description{
        html
      }
      short_description{
        html
      }
      meta_title
      meta_description
      sku
      uid
      categories{
        name
        url_key
      }
      image {
        url
        label
      }
      small_image{
          url
          label
      }
      media_gallery {
          url
          label
          ... on ProductVideo {
              video_content {
                  media_type
                  video_provider
                  video_url
                  video_title
                  video_description
                  video_metadata
              }
          }
      }
      related_products {
        uid
        name
        image{
          url
        }
      }
      upsell_products {
        uid
        name
      }
      crosssell_products {
        uid
        name
      }
      
      __typename
      ... on CustomizableProductInterface {
        options {
          uid
          title
          required
          sort_order
          option_id
          ... on CustomizableFieldOption {
            textField: value {
              sku
              uid
              price
            }
          }
          ... on CustomizableCheckboxOption {
            dropDown: value {
             option_type_id
              price
              price_type
              sku
              sort_order
              title
              uid
              
            } 
          }
          ... on CustomizableDropDownOption{
             value{
              option_type_id
              price
              price_type
              sku
              sort_order
              title
            }
          }
        }
      }
      price_range{
         minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
     
      ... on ConfigurableProduct {
        configurable_options {
          id
          uid
          attribute_id
          label
          position
          use_default
          attribute_code
          values {
            value_index
            uid
            label
            swatch_data{
              value
            }
          }
          product_id
        }
        variants {
         attributes {
            uid
            label
            code
          }
          product {
            id
            name
            sku
            uid
            attribute_set_id
            ... on PhysicalProductInterface {
              weight
            }
            image {
              url
              label
            }
            small_image{
                url
                label
            }      
            price_range{
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
          }
          attributes {
            label
            code
            value_index
          }
        }
      }
    }
  }
}
`
export const PRODUCT_DETAILS_CATEGORIES = gql`
{
  products(filter: { sku: { eq: "Series 3 GPS" } }) {
    items {
      id
      attribute_set_id
      name
      description{
        html
      }
      short_description{
        html
      }
      meta_title
      meta_description
      sku
      uid
      categories{
        name
        url_key
      }
      image {
        url
        label
      }
      small_image{
          url
          label
      }
      media_gallery {
          url
          label
          ... on ProductVideo {
              video_content {
                  media_type
                  video_provider
                  video_url
                  video_title
                  video_description
                  video_metadata
              }
          }
      }
      related_products {
        uid
        name
      }
      upsell_products {
        uid
        name
      }
      crosssell_products {
        uid
        name
      }
            ... on CustomizableProductInterface {
        options {
          title
          required
          sort_order
          uid
          ... on CustomizableFieldOption {
            textField: value {
              sku
              uid
              price
            }
          }
          ... on CustomizableCheckboxOption {
            dropDown: value {
             option_type_id
              price
              price_type
              sku
              sort_order
              title
              uid
              
            } 
          }
          
        }
      }
      
      __typename
      ... on CustomizableProductInterface {
        options {
          title
          required
          sort_order
          option_id
          ... on CustomizableDropDownOption{
             value{
              option_type_id
              price
              price_type
              sku
              sort_order
              title
            }
          }
        }
      }
      price_range{
         minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      
      ... on ConfigurableProduct {
        configurable_options {
          id
          uid
          attribute_id
          label
          position
          use_default
          attribute_code
          values {
            value_index
            uid
            label
            swatch_data{
              value
            }
          }
          product_id
        }
        variants {
         attributes {
            uid
            label
            code
          }
          product {
            id
            name
            sku
            attribute_set_id
            ... on PhysicalProductInterface {
              weight
            }
            price_range{
              minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
            }
          }
          attributes {
            label
            code
            value_index
          }
        }
      }
    }
  }
}
`

export const ADD_TO_PRODUCT_CART = gql`
mutation ($cartId: String!, $items: [CartItemInput!]!){
  addProductsToCart(
    cartId: $cartId,
    cartItems: $items
  ) {
    cart {
      items {
        id
        product {
          name
          sku
          price_range{
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                amount_off
                percent_off
              }
            }
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                amount_off
                percent_off
              }
            }
          }
          image{
            label
            url
        }
        }
        ... on ConfigurableCartItem {
          configurable_options {
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
        }
        quantity
      }
    }
    user_errors {
      code
      message
    }
  }
}
`
export const CUSTOMER_CART = gql`
{
  customerCart {
    id
  }
}
`
export const GET_CUSTOMER_CART = gql`
query ($cart_id: String!) {
  cart(cart_id: $cart_id) {
    email
    shipping_addresses {
      firstname
      lastname
      street
      city
      region {
        code
        label
      }
      country {
        code
        label
      }
      telephone
      available_shipping_methods {
        amount {
          currency
          value
        }
        available
        carrier_code
        carrier_title
        error_message
        method_code
        method_title
        price_excl_tax {
          value
          currency
        }
        price_incl_tax {
          value
          currency
        }
      }
      selected_shipping_method {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
    }

    items {
    id
    uid
    product {
    name
    sku
    image {
      url
      label
    }
    price_tiers {
    quantity
    final_price {
    value
    }
    discount {
    amount_off
    percent_off
    }
    }
    }
     
    prices{
    price{
    value
    }
    }
     
    ... on ConfigurableCartItem {
    configurable_options {
    configurable_product_option_uid
    option_label
    configurable_product_option_value_uid
    value_label
    }
    customizable_options{
    label
    values{
    customizable_option_value_uid
    id
    label
    price{
    value
    }
    value
     
    
    }
     
    }
     
    }
    quantity
    errors {
    code
    message
    }
    }
    prices {
    discounts {
    label
    amount {
    value
    }
    }
    subtotal_excluding_tax {
    value
    }
    applied_taxes {
    label
    amount {
    value
    }
    }
    }
    applied_coupons {
    code
    }
    prices {
    grand_total {
    value
    currency
    }
    }
    }
    }
    
    
`
export const REMOVE_PRODUCT = gql`
mutation ($cart_id: String!, $cart_item_id: Int!){
  removeItemFromCart(
    input: {
      cart_id: $cart_id,
      cart_item_id: $cart_item_id
    }
  )
 {
  cart {
    items {
      id
      product {
        name
        price_range{
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        image{
          label
          url
      }
      }
      quantity
    }
    prices {
      grand_total{
        value
        currency
      }
    }
  }
 }
}
`

export const UPDATE_CUSTOMER_CART = gql`
mutation ($cart_id: String!, $cart_item_uid: ID!, $quantity: Float!) {
  updateCartItems(
    input: {
      cart_id: $cart_id,
      cart_items: [
        {
          cart_item_uid: $cart_item_uid
          quantity: $quantity
        }
      ]
    }
  ){
    cart {
      items {
        uid
        product {
          name
        }
        quantity
      }
      prices {
        grand_total{
          value
          currency
        }
      }
    }
  }
}
`

export const GETWISHLIST = gql`
{
  wishlist {
    items_count
    name
    sharing_code
    updated_at
    items {
      id
      qty
      description
      added_at
      product {
        sku
        name
        image {
          url  
          label  
        }
        price_range{
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }

      }
    }
  }
}

`
export const ADD_CART_TO_WISHLIST = gql`
mutation ($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!){
  addProductsToWishlist(
    wishlistId: $wishlistId
    wishlistItems: $wishlistItems
  ) {
    wishlist {
      id
      items_count
      items_v2 (currentPage: 1, pageSize: 8 ) {
        items {
          id
          quantity
          ... on BundleWishlistItem {
            bundle_options {
              values {
                id
                label
                quantity
              }
            }
          }
          product {
            uid
            name
            sku
            price_range{
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
          }
        }
      }
    }
    user_errors {
      code
      message
    }
  }
}

`
export const REMOVE_PRODUCT_FROM_WISHLIST = gql`
mutation ($wishlistId: ID!, $wishlistItemsIds: [ID!]!){
  removeProductsFromWishlist(
  wishlistId: $wishlistId,
  wishlistItemsIds: $wishlistItemsIds){
    wishlist {
      id
      items_count
      items_v2 {
        items {
          id
          quantity
          product {
            uid
            name
            sku
            price_range{
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
          }
        }
      }
    }
    user_errors {
      code
      message
    }
  }
}

`
export const GET_CUSTOMER = gql`
query{  
  customer {  
      firstname  
      lastname  
      suffix  
      email 
      addresses { 
      firstname    
      lastname  
      street
      city 
      region {    
      region_code 
      region 
           }     
                                             
      postcode      
      country_code      
      telephone   
     }  }}
`
export const GET_COMPARE_LIST = gql`
query ($uid : ID!){
  compareList(
      uid: $uid
      ) {
        uid
        item_count
        attributes {
            code
            label
        }
        items {
            uid
            product {
                sku
                name
                image{
                  url
                }
                color
                connectivity
                size
              
                storage
                short_description {
                    html
                }
                description {
                    html
                }
                

            }
        }
    }
}


`
export const CREATE_COMPARE_LIST = gql`
mutation ( $products:[ID!]){
  createCompareList(
      input: {
          products: $products
      }
  ) {
      uid
      item_count
      attributes {
          code
          label
      }
      items {
          uid
          product {
              sku
              name
              image{
                url
              }
              description {
                  html
              }
          }
      }
  }
}


`
export const APPLY_COUPONS = gql`
mutation ($cart_id: String!, $coupon_code: String!) {
  applyCouponToCart(
    input: {
      cart_id: $cart_id,
      coupon_code:$coupon_code
    }
  ) {
    cart {
      items {
        product {
          name
        }
        quantity
      }
      applied_coupons {
        code
      }
      prices {
        grand_total{
          value
          currency
        }
      }
    }
  }
}
`

export const REMOVE_COUPONS_CART = gql`
mutation ($cart_id:String!){
  removeCouponFromCart(
    input:
      { cart_id: $cart_id }
    ) {
    cart {
      items {
        product {
          name
        }
        quantity
      }
      applied_coupons {
        code
      }
      prices {
        grand_total{
          value
          currency
        }
      }
    }
  }
}


`

export const GET_ADDRESS_LIST = gql`
{
  customer {
    firstname
    middlename
    lastname
    suffix
    prefix
    gender
    date_of_birth
    taxvat
    created_at
    default_shipping
    default_billing
    email
    is_subscribed
    addresses {
      id
      firstname
      lastname
      street
      city
      region {
        region_code
        region
      }
      postcode
      vat_id
      country_code
      telephone
      company
      default_shipping
      default_billing
    }
  }
}
`

export const UPDATE_CUSTOMER = gql`
mutation ($firstname: String!, $lastname: String!, $gender:Int, $prefix:String,  $mobile_number:String!) {
  updateCustomer(
    input: {
      firstname: $firstname
      lastname: $lastname
      gender: $gender
      prefix:  $prefix
      mobile_number:$mobile_number
   
    }
  ) {
    customer {
      firstname
      lastname
      is_subscribed
    }
  }
}
`

export const URL_RESOLVER = gql`
query ($url : String!){
  route(url: $url) {
    __typename
    relative_url
    redirect_code
    type
    ... on SimpleProduct {
      sku
      url_key
      id
      uid
      url_rewrites {
        url
        parameters {
          name
          value
        }
      }
      relative_url
      redirect_code
      type
    }
     ... on CategoryTree {
      uid
      id
      url_key
      uid
      relative_url
      redirect_code
      type
    }
    ... on CmsPage {
      identifier
      url_key
      relative_url
      redirect_code
      type
    }
  }
}
`
export const CREATE_CUSTOMER_ADDRESS = gql`
mutation (

  $region: String,
   $region_code: String ,
   $country_code:CountryCodeEnum!, 
   $street: [String!],
    $telephone: String! ,
    $postcode: String! ,
    $city:String!, 
    $firstname: String!,
    $lastname: String! 
    ){
  createCustomerAddress(input: {
    region: {
      region: $region
      region_code: $region_code
      region_id:4
    }
    country_code: $country_code
    street:$street
    telephone: $telephone
    postcode: $postcode
    city: $city
    firstname: $firstname
    lastname: $lastname
    default_shipping: true
    default_billing: false
  }) {
    id
    region {
      region
      region_code
    }
    country_code
    street
    telephone
    postcode
    city
    default_shipping
    default_billing
  }
}

`
export const UPDATE_CUSTOMER_ADDRESS = gql`
mutation ( $id:Int!, $postcode: String!, $street: [String]!, $city:String!, $firstname: String!, $lastname: String!, $telephone: String!  ){
  updateCustomerAddress(id:$id, input: {
    firstname: $firstname
    lastname: $lastname
    city: $city
    street: $street
    postcode: $postcode
    telephone: $telephone
  }) {
    id
    city
    postcode
    street
  }
}

`
// export const CUSTOMER_ORDER_LIST = gql`
// query {
//   customer {
//     orders(
//       pageSize: 20
//     ) {
//       items {
//         id
//         order_date
//         order_number
//         total {
//           grand_total {
//             value
//             currency
//           }
//         }
//         status
//       }
//     }
//   }
// }
// `

export const CUSTOMER_ORDER_LIST = gql`
query {
  customerOrders {
    items {
      order_number
      id
      created_at
      grand_total
      status
    }
  }
}
`
export const GET_ORDER_DETAILS = gql`
query ($id: Int!){
  salesOrder (id: $id) {
    increment_id
    customer_name
    grand_total
    is_guest_customer
    created_at
    status
    shipping_method
    custom_invoice
    shipping {
      name
      street
      city
      region
      country
      postcode
      telephone
      fax
      company
      
    }
    billing {
      name
      street
      city
      region
      country
      postcode
      telephone
      fax
      company
      
    }
    items {
      title
      sku
      qty
      price
      image
      
      custom_options{
          label
          value
      }
    }
}
}
`
export const RELATED_PRODUCT = gql`
query ($sku: String!){
  products(filter: { sku: { eq: $sku } }) {
    items {
      uid
      name
      sku
      image {
        url
        label
      }
      price_range{
        minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      related_products {
        uid
        name
      }
      upsell_products {
        uid
        name
      }
      crosssell_products {
        uid
        name
      }
    }
  }
}

`

//CHECKOUT  START

export const SHIPPING_METHOD = gql`
{
  customerCart {
    id
    items {
      id
      product {
        name
        sku
      }
      quantity
    }
    shipping_addresses{
        city
        country{
            code
            label
        }
        firstname
        lastname
        postcode
        pickup_location_code
        street
        region{
            region_id
            label
            code
        }
        country{
            code
            label
        }
        available_shipping_methods{
            amount{
                currency
                value
            }

        available
        carrier_code
        carrier_title
        method_code
        method_title
        }
    }
  }
}

`
export const AVAILABLE_PAYMENT_METHOD = gql`
query ($cartId: String!){
  cart(cart_id: $cartId) {
    available_payment_methods {
      code
      title
    }
    selected_payment_method{
      code
      title
    }
     shipping_addresses{
        city
        country{
            code
            label
        }
        firstname
        lastname
        postcode
        pickup_location_code
        street
        region{
            region_id
            label
            code
        }
        country{
            code
            label
        }
        available_shipping_methods{
            amount{
                currency
                value
            }

        available
        carrier_code
        carrier_title
        method_code
        method_title
        }
    }
  }
}

`
export const SELECTED_PAYMENT_METHOD = gql`
query ($cartId: String!) {
  cart(cart_id: $cartId) {
    available_payment_methods {
      code
      title
    }
    selected_payment_method{
      code
      title
    }
  }
}

`
export const SET_PAYMENT_METHOD = gql`
mutation ($cartId: String!,$code:String! ){
  setPaymentMethodOnCart(input: {
      cart_id: $cartId
      payment_method: {
          code: $code
      }
  }) {
    cart {
      selected_payment_method {
        code
      }
    }
  }
}
`

export const SET_SHIPPING_METHOD = gql`
mutation ($cartId: String!, $carrier_code:String!, $method_code:String! ) {
  setShippingMethodsOnCart(input: {
    cart_id: $cartId
    shipping_methods: [
      {
        carrier_code: $carrier_code
        method_code: $method_code
      }
    ]
  }) {
    cart {
      shipping_addresses {
        selected_shipping_method {
          carrier_code
          method_code
          carrier_title
          method_title
        }
      }
    }
  }
}
`

export const SET_SHIPPING_ADDRESS = gql`
mutation (
  $cartId: String!,
  $firstname:String! ,
  $lastname:String!,
  $company:String,
  $street:[String]!,
  $city:String!,
  $region:String,
  $region_id: Int,
  $postcode:String!,
  $country_code:String!,
  $telephone:String!){
  setShippingAddressesOnCart(
    input: {
      cart_id:$cartId
      shipping_addresses: [
        {
          address: {
            firstname: $firstname
            lastname: $lastname
            company: $company
            street: $street
            city: $city
            region: $region
            region_id: $region_id
            postcode: $postcode
            country_code: $country_code
            telephone: $telephone
            save_in_address_book: false
          }
        }
      ]
    }
  ) {
    cart {
      shipping_addresses {
        firstname
        lastname
        company
        street
        city
        region {
          code
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
        available_shipping_methods{
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
    }
  }
}
`

export const SET_BILLING_ADDRESS = gql`
mutation (
  $cartId: String!,
  $firstname:String! ,
  $lastname:String!,
  $company:String,
  $street:[String]!,
  $city:String!,
  $region:String,
  $region_id: Int,
  $postcode:String!,
  $country_code:String!,
  $telephone:String!) {
  setBillingAddressOnCart(
    input: {
      cart_id: $cartId
      billing_address: {
        address: {
          firstname: $firstname
          lastname: $lastname
          company: $company
          street: $street
          city: $city
          region: $region
          region_id: $region_id
          postcode: $postcode
          country_code: $country_code
          telephone: $telephone
          save_in_address_book: false
        }
      }
    }
  ) {
    cart {
      billing_address {
        firstname
        lastname
        company
        street
        city
        region{
          code
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
      }
    }
  }
}
`


export const REMOVE_ADDRESS = gql`
mutation ($id: Int!){
  deleteCustomerAddress(id: $id)
}
`

export const GET_ABOUT_US = gql`
query ($identifier : String!){
  cmsBlocks(identifiers: $identifier) {
    items {
      identifier
      title
      content
    }
  }
}
`

export const GET_CMS_PAGE = gql`
query ($identifier : String!){
  cmsPage(identifier: $identifier) {
    identifier
    url_key
    title
    content
    content_heading
    page_layout
    meta_title
    meta_description
    meta_keywords
  }
}
`

//Payment Gateway

export const GENERATE_HASH = gql`
mutation ($c_firstname:String, $grand_total:Float!, $email: String!,  $sku: String!,  $amount: String!,  $s_firstname:String!, $s_lastname:String!, $s_street_1:String!, $s_street_2:String, $s_city:String!, $s_postcode:String!, $s_state:String!,  $s_country:String, $s_phone:String, $b_firstname:String!, $b_lastname:String!, $b_street_1:String!,  $b_street_2:String, $b_city:String!, $b_postcode:String!, $b_state:String!,  $b_country:String!, $b_phone:String! ){
  generatePinelabsHash(
      input: {
          grand_total: $grand_total
          customer: {
              email: $email
              firstname: $c_firstname
          }
          item: {
              sku: $sku
              amount: $amount
          }
          shipping_address :{
              firstname: $s_firstname
              lastname: $s_lastname
              street_1: $s_street_1
              street_2: $s_street_2
              city: $s_city
              postcode: $s_postcode
              state: $s_state
              country: $s_country
              phone: $s_phone
          }
  
           billing_address :{
            firstname: $b_firstname
            lastname: $b_lastname
            street_1: $b_street_1
            street_2: $b_street_2
            city: $b_city
            postcode: $b_postcode
            state: $b_state
            country: $b_country
            phone: $b_phone
        }
      }) {
        response_code
        response_message
        merchant_transaction_id
        redirect_url
        gateway_response
          }
  }
`

export const PLACE_ORDER = gql`
mutation ($card_id:String!){
  placeOrder(input: {cart_id: $card_id}) {
    order {
      order_number
    }
  }
}
`

export const UPDATE_ORDER = gql`
mutation ($order_id:String!, $payment_response:String!) {
  updatePaymentInformation(
    input: {
        data: {
            order_id: $order_id
            payment_response: $payment_response
        }
    }) {
        response {
        status
        message
        items {
            name
            sku
            image
            price
        }
        order_total
    }

    }
}
`

export const UPDATE_ORDER_AFTER_PAYMENT = gql`
mutation ($order_id:String!, $payment_response:String!){
  updatePaymentInformation(
    input: {
        data: {
            order_id: $order_id
            payment_response: $payment_response
        }
        
    }) {
        response {
        status
        message
        items {
            name
            sku
            image
            price
        }
        order_total
    }

    }
}
`

export const CHECK_PAYMENT_STATUS = gql`
query ($transaction_id:String!) {
  checkpaymentstatus(transaction_id:$transaction_id) {
    transaction_id
    status    
  }
}
`

export const UPDATE_CART_ITEM = gql`
mutation ($cart_id: String!, $cart_item_uid: String!, $quantity: Int!) {
  updateCartItems(
    input: {
      cart_id: $cart_id,
      cart_items: [
        {
          cart_item_uid: $cart_item_uid
          quantity: $quantity
        }
      ]
    }
  ){
    cart {
      items {
        uid
        product {
          name
        }
        quantity
      }
      prices {
        grand_total{
          value
          currency
        }
      }
    }
  }
}

`

export const GET_REGION_LIST = gql`
query {
  country(id: "IN") {
      id
      two_letter_abbreviation
      three_letter_abbreviation
      full_name_locale
      full_name_english
      available_regions {
          id
          code
          name
      }
  }
}

`

export const GET_BLOG_DATA = gql`
query {
	mpBlogPosts(action: "get_post_list", pageSize: 12, currentPage: 1) {
		total_count
		pageInfo {
		  currentPage
		  endPage
		  hasNextPage
		  hasPreviousPage
		  pageSize
		  startPage
		}
		items {
          post_id
		  allow_comment
		  author_id
		  author_name
		  author_url
		  author_url_key
		  created_at
		  enabled
		  image
		  import_source
		  in_rss
		  layout
		  meta_description
		  meta_keywords
		  meta_robots
		  meta_title
		  name
		  post_content
		  post_id
		  publish_date
		  short_description
		  store_ids
		  updated_at
		  url_key
		  view_traffic
		} 
	}
}

`

export const CONTACT_US = gql`
mutation  ($fullname: String!, $email: String!, $phone: String!, $numberofemp:String!,$solution:String!,$message:String!){

  contactusFormSubmit(

    input:{
       fullname: $fullname
       email: $email
       phone: $phone
       numberofemp:  $numberofemp
       solution: $solution
       message: $message
       status:0      
    }
  ){
      success_message
  }
}
`
export const SEARCH = gql`
query ($search:String!) {
  products(search: $search) {
      page_info{
          total_pages
      }
      total_count
   items {
     id
     name
     sku
     stock_status
     special_price
     image {
      url
     }
     thumbnail {
       url
       label
       position
       disabled
     }
     categories {
       id
       url_key
       name
       position
     }
     price_range {
       minimum_price {
         regular_price {
           value
           currency
         }
         final_price {
           value
           currency
         }
       }
     }
   }
 }
}
`
export const PIN_CODE = gql`
query ($pinCode:String!)
{pin_code(pinCode:$pinCode){
  pinCode
  city
  state_name
  }
}
`
export const FAQS_DATA = gql`
query
{
Faqs(pageSize:1,
    currentPage:1 ,
    filter:{
    status:{eq:"1"}},
    sort: { faq_id: DESC }){
        faq_id
        title
        content
        group
        storeview
        customer_group
        sortorder
        status
        created_at
        updated_at
    }
    FaqGroups{
    faqgroup_id
    groupname
    icon
    storeview
    customer_group
    sortorder
    created_at
    updated_at
    }
}
`

export const REMOVE_COMPARE_LIST = gql`
mutation ($uid: ID! , $products:[ID]!) {
  removeProductsFromCompareList(
    input: {
      uid: $uid,
      products: $products
    }
  ) {
    uid
    item_count
    attributes {
      code
      label
    }
    items {
      uid
      product {
        sku
        name
        description {
          html
        }
      }
    }
  }
}

`