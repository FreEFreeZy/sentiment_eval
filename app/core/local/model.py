import joblib
import pandas as pd
from typing import Optional, Union

class DataFrameModel:
    def __init__(self, model_path: str):
        self.model_path = "../../model/sentiment_lr_optuna.joblib"
        self.model = joblib.load(self.model_path)

    def predict(self, X: pd.DataFrame) -> pd.Series:
        if self.model is None:
            raise ValueError("Модель не загружена")

        predictions_array = self.model.predict(X)
        return pd.Series(predictions_array, index=X.index, name='predictions')

    def predict_proba(self, X: pd.DataFrame) -> Union[pd.DataFrame, None]:
        if self.model is None:
            raise ValueError("Модель не загружена")

        if hasattr(self.model, 'predict_proba'):
            probabilities = self.model.predict_proba(X)
            prob_df = pd.DataFrame(
                probabilities,
                columns=[f'class_{i}' for i in range(probabilities.shape[1])],
                index=X.index
            )

            return prob_df
        else:
            print("Данная модель не поддерживает predict_proba")
            return None

    def get_feature_names(self) -> Optional[list]:
        if hasattr(self.model, 'feature_names_in_'):
            return list(self.model.feature_names_in_)
        return None

    def validate_features(self, X: pd.DataFrame) -> bool:
        expected_features = self.get_feature_names()
        if expected_features is None:
            return True

        if list(X.columns) != expected_features:
            print(f"Предупреждение: Фичи не совпадают!")
            print(f"Ожидалось: {expected_features}")
            print(f"Получено:  {list(X.columns)}")
            return False

        return True