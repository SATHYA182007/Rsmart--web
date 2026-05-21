import cv2
import numpy as np

def inspect_video(path):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        print("Could not open video file:", path)
        return
    
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video Resolution: {width}x{height}")
    print(f"FPS: {fps:.2f}, Frame Count: {frame_count}")
    
    ret, frame = cap.read()
    if not ret:
        print("Failed to read the first frame")
        return
        
    # Analyze the margins of the first frame for black bars
    # Compute the average color for rows and columns
    # Let's inspect the top 100 rows and bottom 100 rows
    top_avg = np.mean(frame[0:20, :, :], axis=(0,1))
    bottom_avg = np.mean(frame[height-20:height, :, :], axis=(0,1))
    left_avg = np.mean(frame[:, 0:20, :], axis=(0,1))
    right_avg = np.mean(frame[:, width-20:width, :], axis=(0,1))
    
    print(f"Average color of top 20 rows (BGR): {top_avg}")
    print(f"Average color of bottom 20 rows (BGR): {bottom_avg}")
    print(f"Average color of left 20 columns (BGR): {left_avg}")
    print(f"Average color of right 20 columns (BGR): {right_avg}")
    
    # Check if there is a black band
    # Let's scan row by row from top to bottom to see where it stops being pure black (intensity < 10)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    row_means = np.mean(gray, axis=1)
    col_means = np.mean(gray, axis=0)
    
    top_black_rows = 0
    while top_black_rows < height and row_means[top_black_rows] < 5:
        top_black_rows += 1
        
    bottom_black_rows = 0
    while bottom_black_rows < height and row_means[height - 1 - bottom_black_rows] < 5:
        bottom_black_rows += 1
        
    left_black_cols = 0
    while left_black_cols < width and col_means[left_black_cols] < 5:
        left_black_cols += 1
        
    right_black_cols = 0
    while right_black_cols < width and col_means[width - 1 - right_black_cols] < 5:
        right_black_cols += 1
        
    print(f"Detected hardcoded black borders:")
    print(f"  Top: {top_black_rows} pixels")
    print(f"  Bottom: {bottom_black_rows} pixels")
    print(f"  Left: {left_black_cols} pixels")
    print(f"  Right: {right_black_cols} pixels")
    
    cap.release()

if __name__ == "__main__":
    inspect_video("public/rsmart.mp4")
