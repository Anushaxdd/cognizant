SET SERVEROUTPUT ON;

BEGIN
    FOR rec IN (
        SELECT CustomerID, Balance
        FROM Customers
    )
    LOOP
        IF rec.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = rec.CustomerID;

            DBMS_OUTPUT.PUT_LINE(
                'VIP status granted to Customer ID: ' || rec.CustomerID
            );
        END IF;
    END LOOP;

    COMMIT;
END;
/