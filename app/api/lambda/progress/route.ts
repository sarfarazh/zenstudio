import { getFunctions, getRenderProgress } from '@remotion/lambda/client';
import { REGION } from '../../../../config.mjs';

export const POST = async (req) => {
  const reqBody = await req.json();

  const functions = await getFunctions({
    region: 'us-east-1',
    compatibleOnly: true,
  });

  const functionName = functions[0].functionName;

  const renderProgress = await getRenderProgress({
    bucketName: reqBody.bucketName,
    functionName,
    region: REGION,
    renderId: reqBody.id,
  });

  if (renderProgress.fatalErrorEncountered) {
    return {
      type: 'error',
      message: renderProgress.errors[0].message,
    };
  }

  if (renderProgress.done) {
    return {
      type: 'done',
      url: renderProgress.outputFile as string,
      size: renderProgress.outputSizeInBytes as number,
    };
  }

  return {
    type: 'progress',
    progress: Math.max(0.03, renderProgress.overallProgress),
  };
};
