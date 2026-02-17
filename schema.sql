-- Healthy Habits - Database Schema Setup
-- Based on ERD: Cutler class Lucidchart

DROP TABLE IF EXISTS screenTimeLog;
DROP TABLE IF EXISTS nutritionLog;
DROP TABLE IF EXISTS activityLogs;
DROP TABLE IF EXISTS streaks;
DROP TABLE IF EXISTS Goals;
DROP TABLE IF EXISTS workoutIdeas;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS Children;
DROP TABLE IF EXISTS tips;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    passwordHash VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userRole VARCHAR(50) NOT NULL,
    dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastLogin DATETIME
);

CREATE TABLE Children (
    childID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    birthdate DATETIME NOT NULL,
    age INT NOT NULL,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE activityLogs (
    activityID INT PRIMARY KEY AUTO_INCREMENT,
    childID INT NOT NULL,
    activityType VARCHAR(50) NOT NULL,
    timeCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration INT NOT NULL,
    steps INT,
    caloriesBurned INT,
    repeatingFlag BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY (childID) REFERENCES Children(childID)
);

CREATE TABLE Goals (
    goalID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    childID INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    targetValue INT NOT NULL,
    goalType VARCHAR(50) NOT NULL,
    value INT NOT NULL DEFAULT 0,
    unit VARCHAR(50) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    isActive BOOL NOT NULL DEFAULT TRUE,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (childID) REFERENCES Children(childID)
);

CREATE TABLE workoutIdeas (
    workoutID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    instructions VARCHAR(200),
    ageGroup VARCHAR(50) NOT NULL,
    durationMinutes INT NOT NULL,
    intensity VARCHAR(50) NOT NULL,
    equipment VARCHAR(50),
    location VARCHAR(50),
    tags VARCHAR(50),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdByUserID INT NOT NULL,
    FOREIGN KEY (createdByUserID) REFERENCES Users(userID)
);

CREATE TABLE recipes (
    recipeID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    instructions VARCHAR(200),
    nutritionInfo VARCHAR(50),
    prepMinutes INT NOT NULL,
    cookMinutes INT NOT NULL,
    servings INT NOT NULL,
    tags VARCHAR(50),
    imageURL VARCHAR(50),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdByUserID INT NOT NULL,
    FOREIGN KEY (createdByUserID) REFERENCES Users(userID)
);

CREATE TABLE nutritionLog (
    nutritionLogID INT PRIMARY KEY AUTO_INCREMENT,
    childID INT NOT NULL,
    foodItem VARCHAR(50) NOT NULL,
    foodGroup VARCHAR(50) NOT NULL,
    timeStamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    servingSize INT NOT NULL,
    isHealthy BOOL NOT NULL DEFAULT TRUE,
    FOREIGN KEY (childID) REFERENCES Children(childID)
);

CREATE TABLE screenTimeLog (
    screenTimeLogID INT PRIMARY KEY AUTO_INCREMENT,
    childID INT NOT NULL,
    date DATETIME NOT NULL,
    duration INT NOT NULL,
    deviceType VARCHAR(50) NOT NULL,
    activityType VARCHAR(50) NOT NULL,
    timeStamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childID) REFERENCES Children(childID)
);

CREATE TABLE streaks (
    streakID INT PRIMARY KEY AUTO_INCREMENT,
    childID INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    currentStreak INT NOT NULL DEFAULT 0,
    longestStreak INT NOT NULL DEFAULT 0,
    lastUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childID) REFERENCES Children(childID)
);

CREATE TABLE tips (
    tipID INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    content VARCHAR(50) NOT NULL,
    ageGroup VARCHAR(50) NOT NULL,
    isActive BOOL NOT NULL DEFAULT TRUE
);
