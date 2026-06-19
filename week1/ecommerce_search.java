package week1;
class ecommerce_search {
    public static void main(String[] args) {

        String[] products = {
            "Laptop",
            "Mobile",
            "Headphones",
            "Keyboard",
            "Mouse"
        };

        String searchItem = "Keyboard";
        boolean found = false;

        for (int i = 0; i < products.length; i++) {
            if (products[i].equalsIgnoreCase(searchItem)) {
                System.out.println(searchItem + " found at position " + (i + 1));
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println(searchItem + " not found");
        }
    }
}
    

