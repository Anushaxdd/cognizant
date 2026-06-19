package week1;

class financial_forecasting {

    static double forecasting(double amount, double rate, int years) {

        if (years == 0) {
            return amount;
        }

        return forecasting(amount * (1 + rate), rate, years - 1);
    }

    public static void main(String[] args) {

        double presentValue = 10000;
        double growthRate = 0.10; // 10%
        int years = 5;

        double futureValue = forecasting(presentValue, growthRate, years);

        System.out.printf("Future Value after %d years = %.2f",
                years, futureValue);
    }
}
