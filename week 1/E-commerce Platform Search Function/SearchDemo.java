public class SearchDemo {

    // Linear Search
    public static Product linearSearch(Product[] products, int id) {

        for (Product product : products) {
            if (product.productId == id) {
                return product;
            }
        }
        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Shoes", "Fashion"),
                new Product(103, "Watch", "Accessories"),
                new Product(104, "Mobile", "Electronics")
        };

        int searchId = 103;

        Product result = linearSearch(products, searchId);

        if (result != null) {
            System.out.println("Product Found:");
            result.display();
        } else {
            System.out.println("Product Not Found");
        }
    }
}