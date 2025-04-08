# Głodny? <img src="./src/assets/logo-small.svg" alt="Głodny? Logo" width="30" height="30" style="vertical-align: middle;">

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Logo

The "Głodny?" (Hungry?) logo represents the app's focus on food and restaurant recommendations:

- The plate and utensils symbolize dining and restaurants
- The question mark represents the app's purpose of helping users decide where to eat
- The gradient color scheme (indigo to purple) gives the app a modern, vibrant look

The logo is available in multiple formats:
- `logo.svg` - Standard logo with circular background
- `logo-small.svg` - Smaller version optimized for the header
- `logo-transparent.svg` - Version with transparent background for flexible use
- `favicon.svg` - Icon version for browser tabs

## Matching API

The application includes a feature to match restaurants based on answer IDs. The matching API calculates a match score for each restaurant based on the provided answer IDs.

### Testing the Matching API

To test the API, you can send a POST request to `http://127.0.0.1:8004/api/matching` with the following JSON body:

```json
{
  "answer_ids": [1, 5, 9, 13, 17]
}
```

This request should return a list of restaurants sorted by their match score based on the selected answers.

### Using the Matching Service

In your Angular components, you can use the `RestaurantService` to get matching restaurants:

```typescript
import { RestaurantService } from 'path/to/restaurant.service';

// In your component
constructor(private restaurantService: RestaurantService) {}

getMatchingRestaurants() {
  const answerIds = [1, 5, 9, 13, 17];
  this.restaurantService.getMatchingRestaurants(answerIds).subscribe({
    next: (restaurants) => {
      // Handle the matched restaurants
      console.log(restaurants);
    },
    error: (err) => {
      // Handle errors
      console.error(err);
    }
  });
}
```

### Quiz Integration

The matching API is now integrated with the quiz feature. When a user completes the quiz, the application:

1. Collects the IDs of all selected answers
2. Sends them to the matching API endpoint
3. Receives a list of restaurants sorted by match score
4. Displays the top 3 matching restaurants to the user

If the matching API is unavailable, the application falls back to using all restaurants with random match scores.

### Match Score Calculation

The application handles match scores in different formats:

1. If the match score is between 0 and 1 (e.g., 0.75), it's converted to a percentage (75%)
2. If the match score is between 0 and 10, it's multiplied by 10 to get a percentage
3. If the match score is already between 0 and 100, it's used directly
4. If no match score is provided, a default value of 50% is used

This ensures that match scores are always displayed as percentages between 0% and 100%.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
