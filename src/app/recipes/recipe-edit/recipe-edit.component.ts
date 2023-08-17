import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/appReducer";
import {addRecipe, updateRecipe} from "../store/recipe.actions";
import {selectRecipe} from "../store/recipe.selectors";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) {
    this.editMode = false;
  };

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['recipeId'];

        this.editMode = params['recipeId'] != null;

        this.initForm();
      });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (!this.editMode) {
      this.store.dispatch(addRecipe({
        payload: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(updateRecipe({
        payload: {
          id: this.id,
          recipe: this.recipeForm.value
        }
      }))
    }
    this.onCancel();
  };

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  };

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  };

  onDeleteIngredient(ingredientId: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientId);
  };

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);


    if (this.editMode) {
      this.store.select(selectRecipe).pipe(
        take(1))
        .subscribe(recipeState => {
          const {name, imagePath, description, ingredients} = recipeState.activatedRecipe;

          recipeName = name;
          recipeImagePath = imagePath;
          recipeDescription = description;
          if (ingredients) {
            for (const ingredient of ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
              }))
            }
          }

        })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    });
  };

}
