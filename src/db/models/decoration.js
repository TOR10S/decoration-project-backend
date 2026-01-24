import { model, Schema } from 'mongoose';

const decorationsSchema = new Schema(
  {
    typeOfDecorations: {
      type: String,
      required: true,
      enum: ["Фотозона","Комплексний декор"]
    },
    theme: {
      type: String,
      required: true,
    },
    colors: {
      type: String,
      required: true,
    },
    images: {
        type: [
    {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    }
  ],
        required: false,
    },
    review: {
      type: String,
      required: false,
    },
    isReadyToGo: {
    type: Boolean,
    default: false,
  }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DecorationsCollection = model('decorations', decorationsSchema);


