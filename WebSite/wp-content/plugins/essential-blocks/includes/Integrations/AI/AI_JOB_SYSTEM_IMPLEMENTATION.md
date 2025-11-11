# AI Job Queue System Implementation

## Overview

This implementation adds an asynchronous job queue system for AI content and image generation in Essential Blocks to prevent AJAX timeout issues when OpenAI API responses take too long.

## Architecture

### 1. JobManager Class (`includes/Integrations/AI/JobManager.php`)

**Purpose**: Manages background jobs for AI generation tasks

**Key Features**:
- Job creation with unique UUIDs
- Status tracking (pending, processing, completed, failed, expired)
- WordPress options table storage
- Automatic cleanup of expired jobs
- Background processing via WordPress cron

**Job Statuses**:
- `pending`: Job created, waiting to be processed
- `processing`: Job is currently being executed
- `completed`: Job finished successfully
- `failed`: Job encountered an error
- `expired`: Job exceeded maximum lifetime (5 minutes)

### 2. AJAX Handlers (`includes/Integrations/AI/AI.php`)

**New Endpoints**:
- `start_ai_job`: Creates and schedules a new AI job
- `check_ai_job_status`: Polls job status and returns results

**Security**: Both endpoints use WordPress nonce verification and capability checks

### 3. Frontend Components

#### AIContentPopover.js
- Modified to use job-based workflow
- Implements polling every 3 seconds
- Maximum polling time: 5 minutes
- Handles all job statuses appropriately

#### AIImagePopover.js
- Modified to use job-based workflow
- Implements polling every 5 seconds (longer for image generation)
- Maximum polling time: 5 minutes
- Maintains existing image processing logic

## Workflow

### Content Generation
1. User clicks "Generate Now"
2. Frontend calls `start_ai_job` with `job_type: 'content'`
3. Backend creates job and schedules immediate processing
4. Frontend starts polling `check_ai_job_status` every 3 seconds
5. When job completes, result is returned and job is cleaned up

### Image Generation
1. User clicks "Generate Images"
2. Frontend calls `start_ai_job` with `job_type: 'image'`
3. Backend creates job and schedules immediate processing
4. Frontend starts polling `check_ai_job_status` every 5 seconds
5. When job completes, images are returned and job is cleaned up

## Error Handling

### Timeout Management
- Jobs expire after 5 minutes maximum
- Stuck jobs are cleaned up hourly
- Frontend stops polling after 5 minutes

### Error Recovery
- Failed jobs store error messages
- Network errors during polling are handled gracefully
- User-friendly error messages displayed

### Cleanup
- Completed jobs are deleted after 5 seconds
- Expired jobs are cleaned up daily
- Stuck processing jobs are cleaned up hourly
- Plugin deactivation clears all scheduled events

## Installation & Setup

### 1. Files Added/Modified

**New Files**:
- `includes/Integrations/AI/JobManager.php` - Job management utility class
- `includes/Integrations/AI/AI.php` - AI integration class with AJAX handlers
- `includes/Integrations/AI/OpenAI.php` - OpenAI API integration class
- `test-ai-job-system.php` - Test script for validation

**Modified Files**:
- `includes/Plugin.php` - Initialize AI integration
- `includes/Core/Maintenance.php` - Added deactivation cleanup
- `src/controls/src/components/AI/AIContentPopover.js` - Job-based workflow
- `src/controls/src/components/AI/AIImagePopover.js` - Job-based workflow

### 2. WordPress Hooks

**Cron Events**:
- `eb_process_ai_job` - Process individual jobs (immediate)
- `eb_cleanup_ai_jobs` - Clean expired jobs (daily)
- `eb_cleanup_stuck_ai_jobs` - Clean stuck jobs (hourly)
- `eb_cleanup_completed_job` - Clean completed jobs (5 seconds delay)

**Plugin Hooks**:
- `register_deactivation_hook` - Clean up scheduled events

## Testing

### Manual Testing
1. Navigate to Essential Blocks admin
2. Go to "Test AI Jobs" submenu
3. Click "Run Tests" to validate job system

### Browser Testing
1. Open browser console
2. Use provided AJAX examples to test endpoints
3. Monitor network requests and responses

## Benefits

### Performance
- Eliminates AJAX timeouts for long-running AI requests
- Non-blocking user interface during generation
- Efficient polling with reasonable intervals

### Reliability
- Automatic retry capability through job system
- Proper error handling and user feedback
- Cleanup prevents database bloat

### User Experience
- Same interface and functionality as before
- Better loading states and error messages
- No interruption from timeout issues

## Backward Compatibility

- Original AJAX endpoints remain functional
- Frontend gracefully falls back on errors
- No changes to existing AI generation logic
- All existing features preserved

## Future Enhancements

### Possible Improvements
- Queue prioritization for different job types
- Progress indicators for long-running jobs
- Job history and analytics
- Batch processing capabilities
- WebSocket integration for real-time updates

### Monitoring
- Add logging for job performance metrics
- Track success/failure rates
- Monitor average processing times
- Alert on high failure rates
