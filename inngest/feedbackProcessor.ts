export async function handleFeedbackCreated(event: any) {
  // This is a background job that runs after feedback is created.
  // Put long-running or retryable work here: send emails, moderate content, analytics, etc.
  try {
    const feedback = event?.data?.feedback;
    console.log('[inngest] handleFeedbackCreated received', { id: feedback?.id, email: feedback?.email });

    // Example: send email (stubbed)
    // await sendEmail({ to: 'ops@example.com', subject: `New feedback from ${feedback.name}`, body: feedback.message })

    // Example: log analytics
    // await analytics.track('feedback.created', { id: feedback.id, category: feedback.category })

    // Mark processed
    return { status: 'ok' };
  } catch (err) {
    console.error('[inngest] handleFeedbackCreated error', err);
    throw err;
  }
}
