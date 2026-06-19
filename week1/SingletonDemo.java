package week1;
class Singleton {

    private static Singleton instance;

    private Singleton() {
        System.out.println("Singleton object created.");
    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public void display() {
        System.out.println("Hello from Singleton class!");
    }
}

public class SingletonDemo {
    public static void main(String[] args) {

        Singleton obj1 = Singleton.getInstance();
        Singleton obj2 = Singleton.getInstance();

        obj1.display();

        if (obj1 == obj2) {
            System.out.println("Both references point to the same object.");
        } else {
            System.out.println("Different objects created.");
        }
    }
}