import mongoose from "mongoose";

const { Schema } = mongoose;

const logSchema = new Schema({
    method: String,
    url: String,
    ipAddress: String,
    queryParameters: Schema.Types.Mixed,
    requestBody: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
});

export const Log = mongoose.model("Log", logSchema);
