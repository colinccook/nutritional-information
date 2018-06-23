# nutritional-information
An experient to host JSON versions of important nutritional information



# Intended usage
Do a HTTP GET on https://colinccook.github.io/nutritional-information/regions.json and choose a code

(for instance, code "uk")

You can then do a HTTP GET on https://colinccook.github.io/nutritional-information/uk/restaurants.json to get a list of  restaurants covered. Choose a code again.

(for instance, code "starbucks")

You can then do a HTTP GET on either:
https://colinccook.github.io/nutritional-information/uk/starbucks/products.json for nutritional information of products for that restaurant.

or

https://colinccook.github.io/nutritional-information/uk/starbucks/sources.json for a list of sources where the nutritional information comes from.

