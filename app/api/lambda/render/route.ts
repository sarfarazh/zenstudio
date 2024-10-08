import {
  AwsRegion,
  getFunctions,
  renderMediaOnLambda,
} from '@remotion/lambda/client';
import { REGION, SITE_NAME } from '../../../../config.mjs';

export const POST = async (request) => {
  const reqBody = await request.json();

  if (
    !process.env.AWS_ACCESS_KEY_ID &&
    !process.env.REMOTION_AWS_ACCESS_KEY_ID
  ) {
    throw new TypeError(
      'Set up Remotion Lambda to render videos. See the README.md for how to do so.'
    );
  }
  if (
    !process.env.AWS_SECRET_ACCESS_KEY &&
    !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
  ) {
    throw new TypeError(
      'The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.'
    );
  }

  const functions = await getFunctions({
    region: 'us-east-1',
    compatibleOnly: true,
  });

  const functionName = functions[0].functionName;

  const result = await renderMediaOnLambda({
    codec: 'h264',
    functionName,
    region: REGION as AwsRegion,
    serveUrl: SITE_NAME,
    composition: reqBody.id,
    inputProps: reqBody.inputProps,
    framesPerLambda: 10,
    downloadBehavior: {
      type: 'download',
      fileName: 'video.mp4',
    },
  });

  return result;
};
