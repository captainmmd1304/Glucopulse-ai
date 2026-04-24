package com.glucopulse.testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class RollNo_SY2_Selenium {
    public static void main(String[] args) {
        // Problem Statement:
        // Test the Authentication and Diabetes Risk Prediction module of GlucoPulse AI.
        // It covers login form validation, navigation to the prediction module,
        // and generating risk predictions using varied form elements (text, dropdowns).

        // Setup ChromeDriver (Ensure chromedriver is in PATH or specify system property)
        // System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        WebDriver driver = new ChromeDriver();
        
        try {
            // 1. Synchronization - Implicit Wait
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            
            // 2. Navigation - Go to the Login Page
            System.out.println("Navigating to GlucoPulse AI Login Page...");
            driver.get("http://localhost:5173/login"); // Assumes default vite port
            driver.manage().window().maximize();

            // 3. Form Handling (Text Input) - Login
            System.out.println("Filling in login credentials...");
            WebElement emailInput = driver.findElement(By.id("login-email"));
            emailInput.sendKeys("testuser@example.com");

            WebElement passwordInput = driver.findElement(By.id("login-password"));
            passwordInput.sendKeys("Password123!");

            WebElement submitBtn = driver.findElement(By.cssSelector("button[type='submit']"));
            submitBtn.click();

            // 4. Synchronization (Explicit Wait) & Navigation Validation
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
            System.out.println("Waiting for dashboard redirect...");
            wait.until(ExpectedConditions.urlContains("/dashboard"));
            System.out.println("Successfully logged in and navigated to Dashboard.");

            // 5. Navigation - Move to Prediction Module
            System.out.println("Navigating to Prediction Module...");
            driver.get("http://localhost:5173/prediction");
            
            // Wait for prediction form to load
            wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//h1[contains(text(), 'Predict Diabetes Risk')]")));

            // 6. Form Handling - Multiple Input Types
            System.out.println("Filling Prediction Form...");
            
            // Text/Number Inputs
            driver.findElement(By.name("age")).sendKeys("45");
            driver.findElement(By.name("bmi")).sendKeys("28.5");
            driver.findElement(By.name("waist_cm")).sendKeys("95");
            driver.findElement(By.name("daily_steps")).sendKeys("4000");
            driver.findElement(By.name("sleep_hours")).sendKeys("6");
            driver.findElement(By.name("sedentary_hours")).sendKeys("10");
            driver.findElement(By.name("stress_level")).sendKeys("8");
            driver.findElement(By.name("sugary_drinks_per_week")).sendKeys("5");
            driver.findElement(By.name("refined_flour_meals_per_week")).sendKeys("4");
            driver.findElement(By.name("indian_thali_per_week")).sendKeys("7");

            // Dropdowns (Select Elements)
            Select genderSelect = new Select(driver.findElement(By.name("gender")));
            genderSelect.selectByValue("male");

            Select familyHistorySelect = new Select(driver.findElement(By.name("family_history")));
            familyHistorySelect.selectByValue("1"); // 1 = Yes

            Select smokingSelect = new Select(driver.findElement(By.name("smoking")));
            smokingSelect.selectByValue("0"); // 0 = No

            Select alcoholSelect = new Select(driver.findElement(By.name("alcohol")));
            alcoholSelect.selectByValue("1"); // 1 = Yes

            System.out.println("Form filled. Submitting prediction...");
            WebElement predictBtn = driver.findElement(By.xpath("//button[@type='submit' and contains(., 'Run Prediction')]"));
            predictBtn.click();

            // 7. Synchronization & Final Validation (Asserting Output)
            System.out.println("Waiting for ML Engine results...");
            WebElement resultPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(), 'Prediction Results')]")));
            
            WebElement riskCategory = driver.findElement(By.cssSelector(".text-lg.font-bold"));
            String categoryText = riskCategory.getText();
            
            WebElement probability = driver.findElement(By.cssSelector(".text-3xl.font-extrabold.text-primary"));
            String probabilityText = probability.getText();

            // Assertions
            if(resultPanel.isDisplayed()) {
                System.out.println("TEST PASSED: Output Result Panel is visible!");
                System.out.println("Analyzed Risk Category: " + categoryText);
                System.out.println("Risk Probability: " + probabilityText);
            } else {
                throw new Exception("Result Validation Failed!");
            }

        } catch (Exception e) {
            System.err.println("TEST FAILED: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Teardown
            System.out.println("Closing browser...");
            driver.quit();
        }
    }
}
