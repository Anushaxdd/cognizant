public class FinancialForecasting {

    // Recursive method to calculate future value
    public static double futureValue(double currentValue, double growthRate, int years) {

        // Base case
        if (years == 0) {
            return currentValue;
        }

        // Recursive case
        return futureValue(currentValue * (1 + growthRate), growthRate, years - 1);
    }

    public static void main(String[] args) {

        double currentValue = 10000;   // Initial investment
        double growthRate = 0.10;      // 10% annual growth
        int years = 5;

        double result = futureValue(currentValue, growthRate, years);

        System.out.printf("Future Value after %d years = %.2f%n", years, result);
    }
}