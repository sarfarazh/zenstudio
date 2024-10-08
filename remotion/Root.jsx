import { Composition } from 'remotion';
import { WordBasedComposition } from './compositions/WordBasedComposition';

function RemotionRoot() {
  const fps = 30;
  
  // Assuming audio duration is exactly 52 seconds
  const audioDurationInSeconds = 52;
  const durationInFrames = audioDurationInSeconds * fps;
  
  return (
    <Composition
      id="WordBasedComposition"
      component={WordBasedComposition}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1080}
      height={1920}
      // Temporary
      defaultProps={{
        transcription: {
          transcription: [
            {
              sentence:
                "Marcus Rashford has faced challenges in recapturing the impressive form he displayed",
              start: 0.0,
              end: 4.68,
              words: [
                {
                  word: " Marcus",
                  start: 0.0,
                  end: 0.64,
                },
                {
                  word: " Rashford",
                  start: 0.64,
                  end: 1.0,
                },
                {
                  word: " has",
                  start: 1.0,
                  end: 1.28,
                },
                {
                  word: " faced",
                  start: 1.28,
                  end: 1.48,
                },
                {
                  word: " challenges",
                  start: 1.48,
                  end: 2.02,
                },
                {
                  word: " in",
                  start: 2.02,
                  end: 2.3,
                },
                {
                  word: " recapturing",
                  start: 2.3,
                  end: 3.0,
                },
                {
                  word: " the",
                  start: 3.0,
                  end: 3.28,
                },
                {
                  word: " impressive",
                  start: 3.28,
                  end: 3.76,
                },
                {
                  word: " form",
                  start: 3.76,
                  end: 4.06,
                },
                {
                  word: " he",
                  start: 4.06,
                  end: 4.28,
                },
                {
                  word: " displayed",
                  start: 4.28,
                  end: 4.68,
                },
              ],
            },
            {
              sentence:
                "during the 2022-23 season. To assist him, former Manchester United striker Michael Owen has shared",
              start: 4.68,
              end: 12.66,
              words: [
                {
                  word: " during",
                  start: 4.68,
                  end: 5.22,
                },
                {
                  word: " the",
                  start: 5.22,
                  end: 5.44,
                },
                {
                  word: " 2022",
                  start: 5.44,
                  end: 6.24,
                },
                {
                  word: "-23",
                  start: 6.24,
                  end: 7.14,
                },
                {
                  word: " season.",
                  start: 7.14,
                  end: 7.66,
                },
                {
                  word: " To",
                  start: 8.16,
                  end: 8.28,
                },
                {
                  word: " assist",
                  start: 8.28,
                  end: 8.64,
                },
                {
                  word: " him,",
                  start: 8.64,
                  end: 9.04,
                },
                {
                  word: " former",
                  start: 9.34,
                  end: 9.48,
                },
                {
                  word: " Manchester",
                  start: 9.48,
                  end: 10.04,
                },
                {
                  word: " United",
                  start: 10.04,
                  end: 10.58,
                },
                {
                  word: " striker",
                  start: 10.58,
                  end: 11.06,
                },
                {
                  word: " Michael",
                  start: 11.06,
                  end: 11.56,
                },
                {
                  word: " Owen",
                  start: 11.56,
                  end: 11.86,
                },
                {
                  word: " has",
                  start: 11.86,
                  end: 12.38,
                },
                {
                  word: " shared",
                  start: 12.38,
                  end: 12.66,
                },
              ],
            },
            {
              sentence:
                "insightful advice, encouraging Rashford to start loving yourself more. Owen emphasises the",
              start: 12.66,
              end: 19.8,
              words: [
                {
                  word: " insightful",
                  start: 12.66,
                  end: 13.42,
                },
                {
                  word: " advice,",
                  start: 13.42,
                  end: 14.08,
                },
                {
                  word: " encouraging",
                  start: 14.42,
                  end: 14.96,
                },
                {
                  word: " Rashford",
                  start: 14.96,
                  end: 15.44,
                },
                {
                  word: " to",
                  start: 15.44,
                  end: 15.74,
                },
                {
                  word: " start",
                  start: 15.74,
                  end: 16.2,
                },
                {
                  word: " loving",
                  start: 16.2,
                  end: 16.62,
                },
                {
                  word: " yourself",
                  start: 16.62,
                  end: 17.22,
                },
                {
                  word: " more.",
                  start: 17.22,
                  end: 17.7,
                },
                {
                  word: " Owen",
                  start: 18.34,
                  end: 18.72,
                },
                {
                  word: " emphasises",
                  start: 18.72,
                  end: 19.44,
                },
                {
                  word: " the",
                  start: 19.44,
                  end: 19.8,
                },
              ],
            },
            {
              sentence:
                "importance of small victories in boosting self-esteem and gaining the affection of",
              start: 19.8,
              end: 24.96,
              words: [
                {
                  word: " importance",
                  start: 19.8,
                  end: 20.22,
                },
                {
                  word: " of",
                  start: 20.22,
                  end: 20.62,
                },
                {
                  word: " small",
                  start: 20.62,
                  end: 20.86,
                },
                {
                  word: " victories",
                  start: 20.86,
                  end: 21.38,
                },
                {
                  word: " in",
                  start: 21.38,
                  end: 21.86,
                },
                {
                  word: " boosting",
                  start: 21.86,
                  end: 22.36,
                },
                {
                  word: " self",
                  start: 22.36,
                  end: 22.72,
                },
                {
                  word: "-esteem",
                  start: 22.72,
                  end: 23.2,
                },
                {
                  word: " and",
                  start: 23.2,
                  end: 23.86,
                },
                {
                  word: " gaining",
                  start: 23.86,
                  end: 24.16,
                },
                {
                  word: " the",
                  start: 24.16,
                  end: 24.48,
                },
                {
                  word: " affection",
                  start: 24.48,
                  end: 24.82,
                },
                {
                  word: " of",
                  start: 24.82,
                  end: 25.28,
                },
              ],
            },
            {
              sentence:
                "fans. He suggests that even when confidence is low, performing hard work, such as pressing",
              start: 25.84,
              end: 32.4,
              words: [
                {
                  word: " fans.",
                  start: 25.82,
                  end: 26.18,
                },
                {
                  word: " He",
                  start: 27.14,
                  end: 27.36,
                },
                {
                  word: " suggests",
                  start: 27.36,
                  end: 27.84,
                },
                {
                  word: " that",
                  start: 27.84,
                  end: 28.12,
                },
                {
                  word: " even",
                  start: 28.12,
                  end: 28.4,
                },
                {
                  word: " when",
                  start: 28.4,
                  end: 28.72,
                },
                {
                  word: " confidence",
                  start: 28.72,
                  end: 29.18,
                },
                {
                  word: " is",
                  start: 29.18,
                  end: 29.5,
                },
                {
                  word: " low,",
                  start: 29.5,
                  end: 29.84,
                },
                {
                  word: " performing",
                  start: 30.3,
                  end: 30.62,
                },
                {
                  word: " hard",
                  start: 30.62,
                  end: 31.04,
                },
                {
                  word: " work,",
                  start: 31.04,
                  end: 31.5,
                },
                {
                  word: " such",
                  start: 31.74,
                  end: 31.92,
                },
                {
                  word: " as",
                  start: 31.92,
                  end: 32.14,
                },
                {
                  word: " pressing",
                  start: 32.14,
                  end: 32.4,
                },
              ],
            },
            {
              sentence:
                "opponents and blocking clearances, can lead to unexpected successes on the pitch. Owen believes",
              start: 32.4,
              end: 38.9,
              words: [
                {
                  word: " opponents",
                  start: 32.4,
                  end: 32.98,
                },
                {
                  word: " and",
                  start: 32.98,
                  end: 33.32,
                },
                {
                  word: " blocking",
                  start: 33.32,
                  end: 33.74,
                },
                {
                  word: " clearances,",
                  start: 33.74,
                  end: 34.4,
                },
                {
                  word: " can",
                  start: 34.78,
                  end: 34.9,
                },
                {
                  word: " lead",
                  start: 34.9,
                  end: 35.16,
                },
                {
                  word: " to",
                  start: 35.16,
                  end: 35.4,
                },
                {
                  word: " unexpected",
                  start: 35.4,
                  end: 36.16,
                },
                {
                  word: " successes",
                  start: 36.16,
                  end: 36.76,
                },
                {
                  word: " on",
                  start: 36.76,
                  end: 37.02,
                },
                {
                  word: " the",
                  start: 37.02,
                  end: 37.2,
                },
                {
                  word: " pitch.",
                  start: 37.2,
                  end: 37.6,
                },
                {
                  word: " Owen",
                  start: 38.32,
                  end: 38.44,
                },
                {
                  word: " believes",
                  start: 38.44,
                  end: 38.9,
                },
              ],
            },
            {
              sentence:
                "that by focusing on these little wins and building team cohesion, Rashford can regain",
              start: 38.9,
              end: 44.44,
              words: [
                {
                  word: " that",
                  start: 38.9,
                  end: 39.12,
                },
                {
                  word: " by",
                  start: 39.12,
                  end: 39.36,
                },
                {
                  word: " focusing",
                  start: 39.36,
                  end: 39.76,
                },
                {
                  word: " on",
                  start: 39.76,
                  end: 40.02,
                },
                {
                  word: " these",
                  start: 40.02,
                  end: 40.32,
                },
                {
                  word: " little",
                  start: 40.32,
                  end: 40.86,
                },
                {
                  word: " wins",
                  start: 40.86,
                  end: 41.26,
                },
                {
                  word: " and",
                  start: 41.26,
                  end: 41.64,
                },
                {
                  word: " building",
                  start: 41.64,
                  end: 42.08,
                },
                {
                  word: " team",
                  start: 42.08,
                  end: 42.48,
                },
                {
                  word: " cohesion,",
                  start: 42.48,
                  end: 43.2,
                },
                {
                  word: " Rashford",
                  start: 43.56,
                  end: 43.84,
                },
                {
                  word: " can",
                  start: 43.84,
                  end: 44.12,
                },
                {
                  word: " regain",
                  start: 44.12,
                  end: 44.44,
                },
              ],
            },
            {
              sentence:
                "the trust and support of the old Trafford crowd. Stay tuned for more news on Manchester United.",
              start: 44.44,
              end: 51.7,
              words: [
                {
                  word: " the",
                  start: 44.44,
                  end: 44.74,
                },
                {
                  word: " trust",
                  start: 44.74,
                  end: 44.96,
                },
                {
                  word: " and",
                  start: 44.96,
                  end: 45.32,
                },
                {
                  word: " support",
                  start: 45.32,
                  end: 45.8,
                },
                {
                  word: " of",
                  start: 45.8,
                  end: 46.28,
                },
                {
                  word: " the",
                  start: 46.28,
                  end: 46.5,
                },
                {
                  word: " old",
                  start: 46.5,
                  end: 46.98,
                },
                {
                  word: " Trafford",
                  start: 46.98,
                  end: 47.48,
                },
                {
                  word: " crowd.",
                  start: 47.48,
                  end: 47.98,
                },
                {
                  word: " Stay",
                  start: 48.72,
                  end: 48.96,
                },
                {
                  word: " tuned",
                  start: 48.96,
                  end: 49.36,
                },
                {
                  word: " for",
                  start: 49.36,
                  end: 49.6,
                },
                {
                  word: " more",
                  start: 49.6,
                  end: 49.9,
                },
                {
                  word: " news",
                  start: 49.9,
                  end: 50.22,
                },
                {
                  word: " on",
                  start: 50.22,
                  end: 50.48,
                },
                {
                  word: " Manchester",
                  start: 50.48,
                  end: 51.06,
                },
                {
                  word: " United.",
                  start: 51.06,
                  end: 51.7,
                },
              ],
            },
          ]
        },
        slides: [
          "https://foxicons-dev.s3.us-east-1.amazonaws.com/slide_01.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAtSSw4CyEKzJZzVI%2Fgtf5pgW5%2FjQqzAFh%2F%2FBthXYzoBAiEA04RZwstw8JpanuhyPJl9SKbyFV%2BjslUXMczo77ryLWUq%2BwIIRBAAGgwyNzIyOTg4NTQ1ODQiDJhRXcoUKc9b162gwirYAi6Z%2BEcWGzaCjrr78Xt7SE5E%2FjykE%2FsaIJBWnJ8%2BrdnnTGKaOlNOZ22uUklWfBMkLhWRlVzg5zig%2Ft7f6W316nCL80wDA4Em23R1gi101DFxH%2Fw2amw17hJ8zcWptH1fXG3kCsmC5p9aribY3RomyV2aAVqIOGVojowytD2NK%2BhSu2kUcz39sy8DURFUBgeUeiYRB6VqUXqvpqHxT3tjvS5yw7h4JqV6SOjlJvOiFZv5IwqjyLbix40PoXOUIK1HsTIi37oUtgmVjigg%2BO1zM1hEtSIHzc4Ql3bkZX3%2BAkugNBgF%2FdAGNkR14pofrm1pRMTzypidzV6ziOLrlhpLlyJ59pm8Ew6TV%2BR6aRIYaOAP1X4%2BDs58GtGFJPbkjYd2ixlqEhAbD0y0kNZzsqi07HljFW3QDNBIsvamIhnoyYSmVzEuyGB8i9%2BTBaekNXzSy9RwTw7WGWLLMMqZlLgGOrMClA9wX%2F%2BgrDVOiHTH4Fj8ncrCM%2FC4Bh99kY%2Fin%2BSLjKldh3vzMdObXVuFLdPG18V4ji62uuEaequt09dDxNxSTGUT5KHMHgaAavE6o5GXFgSE%2B%2BT7cjemzJmE0dHfmZnpOLn0nIPN%2FSCJCttaIgO8XagIwVVv2mjzb%2FiO0ycRYWoY8v4ArH%2FxyXQcG3fxJJklSV5irX0Zls5Ic%2B3kGZZtF5YmyzearEyod2vT1UMOe6jzapQY4HuGzdvWfk6jGGdEHN1GbF%2B8V%2BhnOWgAQz5UWXUOmCtC1IPI6KUEwS5dGKdHxcAuXieJjCWPZCYNRbNbnap%2BN0oEvjrPhlKRQcXmPEPLNmcifZyCLhlj3E6xRzOfF8sSDNYGAi0QJbAThw%2B0bY%2Bn%2F8I659DXEarGk2HA%2FZoarw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241008T142401Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAT6ZSGZC4DVJVNLF5%2F20241008%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=246c967d43827dc9e51c1231f014aea87ccfaa78c87e4cde32d0995e056a7015",
          "https://foxicons-dev.s3.us-east-1.amazonaws.com/slide_02.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAtSSw4CyEKzJZzVI%2Fgtf5pgW5%2FjQqzAFh%2F%2FBthXYzoBAiEA04RZwstw8JpanuhyPJl9SKbyFV%2BjslUXMczo77ryLWUq%2BwIIRBAAGgwyNzIyOTg4NTQ1ODQiDJhRXcoUKc9b162gwirYAi6Z%2BEcWGzaCjrr78Xt7SE5E%2FjykE%2FsaIJBWnJ8%2BrdnnTGKaOlNOZ22uUklWfBMkLhWRlVzg5zig%2Ft7f6W316nCL80wDA4Em23R1gi101DFxH%2Fw2amw17hJ8zcWptH1fXG3kCsmC5p9aribY3RomyV2aAVqIOGVojowytD2NK%2BhSu2kUcz39sy8DURFUBgeUeiYRB6VqUXqvpqHxT3tjvS5yw7h4JqV6SOjlJvOiFZv5IwqjyLbix40PoXOUIK1HsTIi37oUtgmVjigg%2BO1zM1hEtSIHzc4Ql3bkZX3%2BAkugNBgF%2FdAGNkR14pofrm1pRMTzypidzV6ziOLrlhpLlyJ59pm8Ew6TV%2BR6aRIYaOAP1X4%2BDs58GtGFJPbkjYd2ixlqEhAbD0y0kNZzsqi07HljFW3QDNBIsvamIhnoyYSmVzEuyGB8i9%2BTBaekNXzSy9RwTw7WGWLLMMqZlLgGOrMClA9wX%2F%2BgrDVOiHTH4Fj8ncrCM%2FC4Bh99kY%2Fin%2BSLjKldh3vzMdObXVuFLdPG18V4ji62uuEaequt09dDxNxSTGUT5KHMHgaAavE6o5GXFgSE%2B%2BT7cjemzJmE0dHfmZnpOLn0nIPN%2FSCJCttaIgO8XagIwVVv2mjzb%2FiO0ycRYWoY8v4ArH%2FxyXQcG3fxJJklSV5irX0Zls5Ic%2B3kGZZtF5YmyzearEyod2vT1UMOe6jzapQY4HuGzdvWfk6jGGdEHN1GbF%2B8V%2BhnOWgAQz5UWXUOmCtC1IPI6KUEwS5dGKdHxcAuXieJjCWPZCYNRbNbnap%2BN0oEvjrPhlKRQcXmPEPLNmcifZyCLhlj3E6xRzOfF8sSDNYGAi0QJbAThw%2B0bY%2Bn%2F8I659DXEarGk2HA%2FZoarw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241008T143027Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAT6ZSGZC4DVJVNLF5%2F20241008%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5450e510cdc72705b64a112c158292c5e5e4457f4f90e744cc2ac6e814e66c4e",
          "https://foxicons-dev.s3.us-east-1.amazonaws.com/slide_03.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAtSSw4CyEKzJZzVI%2Fgtf5pgW5%2FjQqzAFh%2F%2FBthXYzoBAiEA04RZwstw8JpanuhyPJl9SKbyFV%2BjslUXMczo77ryLWUq%2BwIIRBAAGgwyNzIyOTg4NTQ1ODQiDJhRXcoUKc9b162gwirYAi6Z%2BEcWGzaCjrr78Xt7SE5E%2FjykE%2FsaIJBWnJ8%2BrdnnTGKaOlNOZ22uUklWfBMkLhWRlVzg5zig%2Ft7f6W316nCL80wDA4Em23R1gi101DFxH%2Fw2amw17hJ8zcWptH1fXG3kCsmC5p9aribY3RomyV2aAVqIOGVojowytD2NK%2BhSu2kUcz39sy8DURFUBgeUeiYRB6VqUXqvpqHxT3tjvS5yw7h4JqV6SOjlJvOiFZv5IwqjyLbix40PoXOUIK1HsTIi37oUtgmVjigg%2BO1zM1hEtSIHzc4Ql3bkZX3%2BAkugNBgF%2FdAGNkR14pofrm1pRMTzypidzV6ziOLrlhpLlyJ59pm8Ew6TV%2BR6aRIYaOAP1X4%2BDs58GtGFJPbkjYd2ixlqEhAbD0y0kNZzsqi07HljFW3QDNBIsvamIhnoyYSmVzEuyGB8i9%2BTBaekNXzSy9RwTw7WGWLLMMqZlLgGOrMClA9wX%2F%2BgrDVOiHTH4Fj8ncrCM%2FC4Bh99kY%2Fin%2BSLjKldh3vzMdObXVuFLdPG18V4ji62uuEaequt09dDxNxSTGUT5KHMHgaAavE6o5GXFgSE%2B%2BT7cjemzJmE0dHfmZnpOLn0nIPN%2FSCJCttaIgO8XagIwVVv2mjzb%2FiO0ycRYWoY8v4ArH%2FxyXQcG3fxJJklSV5irX0Zls5Ic%2B3kGZZtF5YmyzearEyod2vT1UMOe6jzapQY4HuGzdvWfk6jGGdEHN1GbF%2B8V%2BhnOWgAQz5UWXUOmCtC1IPI6KUEwS5dGKdHxcAuXieJjCWPZCYNRbNbnap%2BN0oEvjrPhlKRQcXmPEPLNmcifZyCLhlj3E6xRzOfF8sSDNYGAi0QJbAThw%2B0bY%2Bn%2F8I659DXEarGk2HA%2FZoarw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241008T143838Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAT6ZSGZC4DVJVNLF5%2F20241008%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a5f66f60c7eaa84d128e654a74d87e0535cc5cebee69ec26e33d2613d73fd863",
          "https://foxicons-dev.s3.us-east-1.amazonaws.com/slide_04.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAtSSw4CyEKzJZzVI%2Fgtf5pgW5%2FjQqzAFh%2F%2FBthXYzoBAiEA04RZwstw8JpanuhyPJl9SKbyFV%2BjslUXMczo77ryLWUq%2BwIIRBAAGgwyNzIyOTg4NTQ1ODQiDJhRXcoUKc9b162gwirYAi6Z%2BEcWGzaCjrr78Xt7SE5E%2FjykE%2FsaIJBWnJ8%2BrdnnTGKaOlNOZ22uUklWfBMkLhWRlVzg5zig%2Ft7f6W316nCL80wDA4Em23R1gi101DFxH%2Fw2amw17hJ8zcWptH1fXG3kCsmC5p9aribY3RomyV2aAVqIOGVojowytD2NK%2BhSu2kUcz39sy8DURFUBgeUeiYRB6VqUXqvpqHxT3tjvS5yw7h4JqV6SOjlJvOiFZv5IwqjyLbix40PoXOUIK1HsTIi37oUtgmVjigg%2BO1zM1hEtSIHzc4Ql3bkZX3%2BAkugNBgF%2FdAGNkR14pofrm1pRMTzypidzV6ziOLrlhpLlyJ59pm8Ew6TV%2BR6aRIYaOAP1X4%2BDs58GtGFJPbkjYd2ixlqEhAbD0y0kNZzsqi07HljFW3QDNBIsvamIhnoyYSmVzEuyGB8i9%2BTBaekNXzSy9RwTw7WGWLLMMqZlLgGOrMClA9wX%2F%2BgrDVOiHTH4Fj8ncrCM%2FC4Bh99kY%2Fin%2BSLjKldh3vzMdObXVuFLdPG18V4ji62uuEaequt09dDxNxSTGUT5KHMHgaAavE6o5GXFgSE%2B%2BT7cjemzJmE0dHfmZnpOLn0nIPN%2FSCJCttaIgO8XagIwVVv2mjzb%2FiO0ycRYWoY8v4ArH%2FxyXQcG3fxJJklSV5irX0Zls5Ic%2B3kGZZtF5YmyzearEyod2vT1UMOe6jzapQY4HuGzdvWfk6jGGdEHN1GbF%2B8V%2BhnOWgAQz5UWXUOmCtC1IPI6KUEwS5dGKdHxcAuXieJjCWPZCYNRbNbnap%2BN0oEvjrPhlKRQcXmPEPLNmcifZyCLhlj3E6xRzOfF8sSDNYGAi0QJbAThw%2B0bY%2Bn%2F8I659DXEarGk2HA%2FZoarw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241008T143853Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAT6ZSGZC4DVJVNLF5%2F20241008%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=62d9155cb0efe292f1d1eea239e3ca17c0671ce3fed513822269b6c73087a5ab",
        ],
        audioSrc: '/audio.mp3',
      videoSettings: {
        word_composition: {
          subtitle_position: 'center',
          subtitle_textAlign: 'center',
          subtitle_font: 'Anton',
          subtitle_font_size: 40,
          subtitle_color: '#FFFFFF',
        }
      }
      }}
    />
  )
}

export default RemotionRoot