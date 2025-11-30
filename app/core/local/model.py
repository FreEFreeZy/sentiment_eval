import joblib
import pandas as pd
from .model_preprocessing import preprocess_test_df
from pathlib import Path

class DataFrameModel:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent.parent.parent
        self.model_path = self.project_root / "app" / "model" / "sentiment_lr_optuna.joblib"
        if not self.model_path.exists():
            self.model_path = (self.project_root / "model" / "sentiment_lr_optuna.joblib")
        self.model = joblib.load(self.model_path)
        self.classes = list(self.model.classes_)

    def predict(self, df: pd.DataFrame) -> pd.DataFrame | None:
        required = {"ID", "text", "src"}
        missing = required - set(df.columns)
        if missing:
            return None
        df_proc = preprocess_test_df(df)

        texts_proc = df_proc["text"].tolist()

        preds = self.model.predict(texts_proc)

        # Собираем итоговый датафрейм только с ID и label
        result_df = pd.DataFrame({
            "ID": df["ID"],
            "label": preds.astype(int),
        })

        return result_df

model = DataFrameModel()