while true;
do
	modsec=$(date --utc --reference=tutorial.md +%s)
	nowsec=$(date +%s)
	delta=$((nowsec-modsec))

	if [ $delta -lt 30 ]; then
		git add .
		git commit -m "hello"
		git push
	fi
	modsec=$(date --utc --reference=tutorial.md +%s)
	nowsec=$(date +%s)
	delta=$((nowsec-modsec))
done

